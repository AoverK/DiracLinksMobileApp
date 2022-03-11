/**
 * React Native Heart Rate monitor library based on Polidea's React Native BLE library
 * 
 * https://github.com/facebook/react-native
 * https://github.com/Polidea/react-native-ble-plx
 *
 * @format
 * @flow
 */

import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const HEAR_RATE_SERVICE_GUID = '180D';
const HEART_RATE_MEASUREMENT_CHARACTERISTIC_GUID = '2A37';


export const StateCodes =  {
  POWERED_ON: "powered on",
  POWERED_OFF: "powered off",
  UNAUTHORIZED: "unauthorized",
  RESETTING: "resetting",
  UNSUPPORTED: "unsupported",
  POWEREDOFF: "powered off",
  OTHER: "other",
};

export default class HeartRateMonitor {

  mgr;

  bleManager() {
    if (this.mgr == null) {
      this.mgr = new BleManager();
    }
    return this.mgr;
  }

  startHeartRateDevicesScan(callback) {
    
    return new Promise((resolve, reject) => {
      console.log('waiting for state change in bluetooth...');
      let start = +Date();
      let managerStateSubscription = this.bleManager().onStateChange((state) => {
        if (state === 'PoweredOn') {
          console.log('...bluetooth is powered on, starting scan...');
          this.bleManager().startDeviceScan([HEAR_RATE_SERVICE_GUID], null, (error, device) => {
            if (error) {
              reject(error);
            }
            else if (device != null) {
              callback({id: device.id, name: device.name, friendlyName: device.friendlyName, isConnectable: device.isConnectable, error: null, scanCode: StateCodes.POWERED_ON});
            }
          });
        }
        else if (state === 'PoweredOff') {
          callback(null, {scanCode: StateCodes.POWERED_OFF, reason: 'bluetooth is powered off on device'});
        }
        else if (state === 'Unauthorized') {
          callback(null, {scanCode: StateCodes.UNAUTHORIZED, reason: 'user has not allowed application to use bluetooth on this device'});
        }
        else if (state === 'Resetting') {
          callback(null, {scanCode: StateCodes.RESETTING, reason: 'the device is resetting'});
        }
        else if (state === 'Unsupported') {
          callback(null, {scanCode: StateCodes.UNSUPPORTED, reason: 'heart rate monitor not supported on this device'});
        }
        else if (state === 'PoweredOff') {
          callback(null, {scanCode: StateCodes.POWERD_OFF, reason: 'bluetooth is powered off'});
        }
        else {
          if (+Date() - start > 3000) {
            callback(null, {scanCode: StateCodes.OTHER, reason: `it is likely that you are running on a simulator or a device that does not support bluetooth. state=${state}`});
          }
        }
      }, true); 
    });
  }

  stopHeartRateDevicesScan() {
    this.bleManager().stopDeviceScan();
    console.log('...bluetooth scan complete');
    return new Promise((resolve, reject) => {
      resolve(true);
    }).catch((error) => {
      console.log(error);
    });
  }

  startHeartRateMonitor(deviceId, callback) {
    return new Promise((resolve, reject) => {
      let managerStateSubscription = this.bleManager().onStateChange((state) => {
        if (state === 'PoweredOn') {
          managerStateSubscription.remove();
          this.bleManager().startDeviceScan([HEAR_RATE_SERVICE_GUID], null, (error, device) => {
            if (error) {
              reject({error: error});
            }
            else if (device.id === deviceId) {
              device.connect().then((device) => {
                return device.discoverAllServicesAndCharacteristics()
              }).then((device) => {
                if (device.isConnected()) {
                  this.bleManager().monitorCharacteristicForDevice(
                    device.id, 
                    HEAR_RATE_SERVICE_GUID, 
                    HEART_RATE_MEASUREMENT_CHARACTERISTIC_GUID, 
                    (error, characteristic) => {

                    if (error) {
                      console.log('HeartRateMonitor.startHeartRateMonitor ... monitorCharacteristicForDevice: error=', error);
                     }

                     if (characteristic && characteristic.value) {
                        // See: https://www.bluetooth.com/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.characteristic.heart_rate_measurement.xml
                        // The heart rate mesurement is in the 2nd byte or in the 2nd and 3rd bytes
                        // depending on the flag set in the first byte (if flag 0 then 1 byte, if flag
                        // is 1 then 2 bytes).
                        let heartRate = -1;
                        let decoded = Buffer.from(characteristic.value, 'base64');
                        let firstBitValue = decoded.readInt8(0) & 0x01;
                        if (firstBitValue == 0) {
                          // Heart Rate Value Format is in the 2nd byte
                          heartRate = decoded.readUInt8(1);
                        } else {
                          // Heart Rate Value Format is in the 2nd and 3rd bytes
                          heartRate =  (decoded.readInt8(1) << 8) + decoded.readInt8(2);
                        }
                        callback({heartRate: heartRate, error: null});
                     }
 
                    });                
                 }
              }).catch((error) => {
                reject({heartRate: -1, error: error});
              });                
            }
          });
        }
      }, true);       
    });  
  }

  stopHeartRateMonitor(deviceId) {
    return new Promise((resolve, reject) => {
      let managerStateSubscription = this.bleManager().onStateChange((state) => {
        if (state === 'PoweredOn') {
          managerStateSubscription.remove();
          this.bleManager().cancelDeviceConnection(deviceId);
          resolve(true);
        }
      }, true);
    });  
  }

}
