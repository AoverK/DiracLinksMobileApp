/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import '../../../shim.js'
 import React from 'react';
 import {Node, useState, useEffect, useRef} from 'react';
 import {NavigationContainer} from '@react-navigation/native';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import SplashScreen from 'react-native-splash-screen';
 import base64 from 'react-native-base64'
 //var Buffer = require("@craftzdog/react-native-buffer").Buffer;
 
 import {Buffer} from 'buffer';
 global.Buffer = Buffer;
 
 
 /*
 //var Buffer = require('@craftzdog/react-native-buffer').Buffer;
 global.Buffer = global.Buffer || require('buffer').Buffer; */
 
 import {BleManager} from 'react-native-ble-plx';
 
 export const manager = new BleManager();
 
 import {
   Alert,
   Button,
   Pressable,
   FlatList,
   Image,
   ImageBackground,
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TextInput,
   useColorScheme,
   TouchableOpacity,
   View,
   PermissionsAndroid,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 //import Route from '../../';
 //import Images from '../../screens/image/images';
 import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
 import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
 import Images from '../image/images';
 import firebase from '../../../database/firebase';
 
 const requestPermission = async () => {
   const granted = await PermissionsAndroid.request(
     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
     {
       title: 'Request for Location Permission',
       message: 'Bluetooth Scanner requires access to Fine Location Permission',
       buttonNeutral: 'Ask Me Later',
       buttonNegative: 'Cancel',
       buttonPositive: 'OK',
     },
   );
   return granted === PermissionsAndroid.RESULTS.GRANTED;
 };
 
 async function onReceiveData(identifier,data) {
     let timestamp = new Date();
     let timestampSeconds = timestamp.getTime() / 1000;
     let currentUser = firebase.auth().currentUser.uid.toString();
     let identifierString = identifier;
     let deviceDataString = data;
     if (currentUser != null){
         firebase.firestore().collection('users').doc(currentUser)
         .collection('data_historical').doc().set({ user: currentUser, timestamp: timestamp, timestamp_seconds: timestampSeconds, identifier: identifierString, hr_name: "HR", hr_value: deviceDataString })
         .catch(err =>{
             console.log(err);
         });

         firebase.firestore().collection('users').doc(currentUser)
         .collection('data_current').doc('livestream').set({ user: currentUser, timestamp: timestamp, timestamp_seconds: timestampSeconds, identifier: identifierString, hr_name: "HR", hr_value: deviceDataString })
         .catch(err =>{
             console.log(err);
         });
     }

     
 }

 function handleCharacteristicValueChanged(event) {
    const value = event.target.value;
    console.log('Received ' + value);
    // TODO: Parse Heart Rate Measurement value.
    // See https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
  }
 
 const Stack = createNativeStackNavigator();
 
 const LogoTitle = ({navigation}) => {
   return (
     <Image
       style={{width: 50, height: 50}}
       source={ Images.rightLogo }
     />
   );
 };
 
 
 // BlueetoothScanner does:
 // - access/enable bluetooth module
 // - scan bluetooth devices in the area
 // - list the scanned devices
 //const ConnectScreen = () => {
 const Connect = ({navigation}) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
          headerLeft: () => (
            <TouchableOpacity 
              style={{flexDirection:'row', justifyContent:'flex-start',margin:10 }}
              onPress ={() => navigation.goBack()}>
              <FontAwesomeIcon style={{color:'black', margin:2 }} icon={ faAngleLeft } size={30} />
              <Text style={{ fontSize:22, color: 'black' }}>Back</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Image
              style={{ width: 40, height: 40, resizeMode:'contain' }}
              source={ Images.rightLogo }
            />
          ),
        });
      }, [navigation]);

   const [logData, setLogData] = useState([]);
   const [logCount, setLogCount] = useState(0);
   const [scannedDevices, setScannedDevices] = useState({});
   const [deviceCount, setDeviceCount] = useState(0);
   const [currentDevice, setCurrentDevice] = useState(0);
   const [scannedServices, setScannedServices] = useState({});
   const [servicesCount, setServicesCount] = useState(0);
   //const [bluetoothOnState, setBluetoothOnState] = useState(false);
 
   useEffect(() => {
     manager.onStateChange(state => {
       const subscription = manager.onStateChange(async state => {
         console.log(state);
         const newLogData = logData;
         newLogData.push(state);
         await setLogCount(newLogData.length);
         await setLogData(newLogData);
         subscription.remove();
       }, true);
       return () => subscription.remove();
     });
   }, [manager]);
 
   const activateBluetooth = async () => {
     const btState = await manager.state();
     // test is bluetooth is supported
     if (btState === 'Unsupported') {
       alert('Bluetooth is not supported');
       return false;
     }
     // enable if it is not powered on
     if (btState !== 'PoweredOn') {
       //setBluetoothOnState(true);
       await manager.enable();
     } else {
       await manager.disable();
       //setBluetoothOnState(false);
     }
     return true;
   };

   const scanBluetoothDevices = async () => {
       console.log("Inside scanBluetoothDevices");
     
    const btState = await manager.state();
    // test if bluetooth is powered on
    if (btState !== 'PoweredOn') {
      alert('Bluetooth is not powered on');
      return false;
    }
    // explicitly ask for user's permission
    const permission = await requestPermission();
    if (permission) {
      manager.startDeviceScan(null, null, async (error, device) => {
        // error handling
        if (error) {
          console.log(error);
          return;
        }
        // found a bluetooth device
        if (device.id === hrmDeviceId) {
          console.log(`${device.name} (${device.id})}`);
          const newScannedDevices = scannedDevices;
          newScannedDevices[device.id] = device;
          setDeviceCount(Object.keys(newScannedDevices).length);
          setScannedDevices(scannedDevices);
          //this.manager.stopDeviceScan();
          await device
            .connect()
            .then(connectedDevice => {
              console.log('Device Connected');
              setCurrentDevice(connectedDevice);
              return connectedDevice.discoverAllServicesAndCharacteristics();
            })
            .then(connectedDevice => {
              //console.info(connectedDevice);
              /* '80:6F:B0:D6:F0:4A', 
                '0000180d-0000-1000-8000-00805f9b34fb',
                '00002a37-0000-1000-8000-00805f9b34fb', 
                UUID_HSP_SERVICE = "00001523-1212-efde-1523-785feabcd123"
                UUID_HSP_COMMAND_CHARACTERISTIC = "00001027-1212-efde-1523-785feabcd123"
                UUID_HSP_RESPONSE_CHARACTERISTIC = "00001011-1212-efde-1523-785feabcd123"
                UUID_MRD104_SERVICE = "6E400000-B5A3-F393-E0A9-E50E24DCCA9E" // Shouldn't be needed
                UUID_MRD104_COMMAND_CHARACTERISTIC = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E" // Shouldn't be needed
                UUID_MRD104_RESPONSE_CHARACTERISTIC = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // Shouldn't be needed
                */

                /* manager.readCharacteristicForDevice(
                   device.id,
                   '00001523-1212-efde-1523-785feabcd123',
                   '00001027-1212-efde-1523-785feabcd123'
                )
                .then(msg => {
                    console.log("Read Characteristic");
                    console.log(msg.value);
                    console.log(base64.decode(msg.value));
                })
                .catch(error => {
                   console.log('Read Error: ', error);
                   console.log(error);
                 }); */


                 let testMessageReset = base64.encode("reset\r"); // This works. Should have been using CR as end line character

                 // Setup config for data stream
                manager.writeCharacteristicWithResponseForDevice(
                   device.id,
                   '00001523-1212-efde-1523-785feabcd123',
                   '00001027-1212-efde-1523-785feabcd123',
                   testMessageReset
                )
                .then(msg => {
                    console.log("Write Reset Characteristic");
                    console.log(msg.value);
                    console.log(base64.decode(msg.value));
                })
                .catch(error => {
                   console.log('Write Reset Error: ', error);
                   console.log(error);
                 });

                 let testMessageConfig = base64.encode("set_cfg stream bin\r"); // This works. Should have been using CR as end line character
                 // let testMessageConfig = base64.encode("set_cfg stream ascii\r"); // This works. Should have been using CR as end line character

                 // Setup config for data stream
                manager.writeCharacteristicWithResponseForDevice(
                   device.id,
                   '00001523-1212-efde-1523-785feabcd123',
                   '00001027-1212-efde-1523-785feabcd123',
                   testMessageConfig
                )
                .then(msg => {
                    console.log("Write Config Characteristic");
                    console.log(msg.value);
                    console.log(base64.decode(msg.value));
                })
                .catch(error => {
                   console.log('Write Config Error: ', error);
                   console.log(error);
                 });

                 let testMessageRead = base64.encode("read ppg 9\r"); // This works. Should have been using CR as end line character

                 // Setup config for data stream
                manager.writeCharacteristicWithResponseForDevice(
                   device.id,
                   '00001523-1212-efde-1523-785feabcd123',
                   '00001027-1212-efde-1523-785feabcd123',
                   testMessageRead
                )
                .then(msg => {
                    console.log("Write Config Characteristic");
                    console.log(msg.value);
                    console.log(base64.decode(msg.value));
                })
                .catch(error => {
                   console.log('Write Config Error: ', error);
                   console.log(error);
                 });


                 
                 manager.monitorCharacteristicForDevice(
                   device.id,
                   '00001523-1212-efde-1523-785feabcd123',
                   '00001011-1212-efde-1523-785feabcd123', 
                   // Callback function triggered for every incoming data
                   (err, msg) => {
                       console.log("Monitor Characteristic")
                       if (msg && msg.value){
                           console.log(msg)
                           console.log(msg.value);
                       }
                       
                       if (err) {
                           console.log('Read Monitor Error: ', error);
                         }
                   });
                

              // Heart rate monitor
              manager.monitorCharacteristicForDevice(
                device.id,
                '180D',
                '2A37', 
                // Callback function triggered for every incoming data
                (err, msg) => {
                    //console.log("Outside If statement", msg);
                  //if (msg !== null) {
                  if (msg && msg.value) {

                   
                    //console.log(msg);
                    let heartRate = -1;
                    let decodedBuffer = Buffer.from(msg.value, 'base64');
                    let decodedBufferUTF = Buffer.from(msg.value, 'utf8');
                    let decodedBufferUTF16 = Buffer.from(msg.value, 'utf16le');
                    //let decodedBufferHex = Buffer.from(msg.value, 'hex');
                    let firstBitValue = decodedBuffer.readInt8(0) & 0x01;
                    //let firstBit = decodedBuffer.readInt8(0);
                    let secondBit = decodedBuffer.readInt8(1);
                    //let thirdBit = decodedBuffer.readInt8(2);
                    //let fourthBit = decodedBuffer.readInt8(3);
                    let testDecode = base64.decode(msg.value);
                    //console.log("firstBit: ", firstBit);
                    //console.log("secondBit: ", secondBit);
                    //console.log("thirdBit: ", thirdBit);
                    //console.log("testDecodeBase64: ", testDecode);
                    //console.log("decodedBufferBase64: ", decodedBuffer);
                    //console.log("decodedBufferUTF: ", decodedBufferUTF);
                    //console.log("decodedBufferUTF16: ", decodedBufferUTF16);
                    //console.log("decodedBufferHex: ", decodedBufferHex);
                   //console.log("currentCharacteristic: ", currentCharacteristic);
                    //console.log("firstBit", firstBit);
                    //console.log("secondBit", secondBit);
                    //console.log("thirdBit", thirdBit);
                    //console.log("fourthBit", fourthBit);
                    //var decodedBufferTest = Buffer.from(msg.value); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                    //var firstBitValueTest = decodedBufferTest.readUInt8(1);
                    
                    if (firstBitValue == 0) {
                      // Heart Rate Value Format is in the 2nd byte
                      heartRate = decodedBuffer.readUInt8(1);
                      //console.log("Message Value 1: ",msg.value);
                      //console.log("Decoded Buffer 1: ",decodedBuffer);
                      //console.log("Heart Rate 1: ",heartRate);
                      onReceiveData("00002a37-0000-1000-8000-00805f9b34fb",heartRate);
                      //let heartRateTest = decodedBuffer[1].charCodeAt(1);
                      //console.log("Buffer Array 0: ", decodedBuffer[0]);
                      //console.log("Buffer Array 1: ", decodedBuffer[1]);
                      //console.log("Char Code Atr 1: ", decodedBuffer[1].charCodeAt(0));
                      //var heartRate2 =  (decodedBuffer.readInt8(1) << 8) + decodedBuffer.readInt8(2);
                      //console.log("Heart Rate 2: ",heartRate2);
                    } else {
                      // Heart Rate Value Format is in the 2nd and 3rd bytes
                      heartRate =  (decodedBuffer.readInt8(1) << 8) + decodedBuffer.readInt8(2);
                      console.log("Heart Rate 2: ",heartRate);
                    }
                    //callback({heartRate: heartRate, error: null});

                    //onReceiveData(rawDataDecoded);
                    //onReceiveData(msg.value.toString(2));
                  }
                  if (err) {
                    console.log('HeartRateMonitor', error);
                  }
                },
                'dataUpdate',
              );
              return connectedDevice.services();
            })
            .catch(error => {
              console.log('Device Connection Error');
              console.log(error);
            });
        }
      });
    }
    return true;
  };


 
   //HSP2SPO2_3_4.6: 80:6F:B0:D6:F0:4A
   const hrmDeviceId = '80:6F:B0:D6:F0:4A';
 
   return (
     <View style={{flex: 1, padding: 10}}>
       <View style={{flex: 1, padding: 10}}>
         <Text style={{fontWeight: 'bold'}}>Bluetooth Log ({logCount})</Text>
         <FlatList
           data={logData}
           renderItem={({item}) => {
             return <Text>{item}</Text>;
           }}
         />
         <Button
           styles={styles.primaryButton}
           title="Turn On Bluetooth"
           onPress={activateBluetooth}
         />
       </View>
 
       <View style={{flex: 1, padding: 10}}>
         <Text style={{fontWeight: 'bold'}}>
           Scanned Devices ({deviceCount})
         </Text>
         <FlatList
           data={Object.values(scannedDevices)}
           renderItem={({item}) => {
             return <Text>{`${item.name} (${item.id})`}</Text>;
           }}
         />
         <Button
           title="Scan Devices"
           onPress={scanBluetoothDevices}
         />
         {/* <Button
           title="Scan Devices"
           onPress={async () => {scanBluetoothDevices}}
         /> */}
       </View>
       <View style={{flex: 1, padding: 10}}>
         <Text style={{fontWeight: 'bold'}}>Services ({servicesCount})</Text>
         <FlatList
           data={Object.values(scannedServices)}
           renderItem={({item}) => {
             return <Text>{`${item.name}`}</Text>;
           }}
         />
         <Button
           title="Disconnect"
           onPress={async () => {
               manager.isDeviceConnected(currentDevice.id)
               .then(result => {
                   console.log(result);
               });



                let deviceMessageStop = base64.encode("stop\r"); // This works. Should have been using CR as end line character

                // Setup config for data stream
                manager.writeCharacteristicWithResponseForDevice(
                    currentDevice.id,
                    '00001523-1212-efde-1523-785feabcd123',
                    '00001027-1212-efde-1523-785feabcd123',
                    deviceMessageStop
                )
                .then(msg => {
                    console.log("Write Stop Characteristic");
                    console.log(msg.value);
                    console.log(base64.decode(msg.value));
                })
                .catch(error => {
                    console.log('Write Stop Error: ', error);
                    console.log(error);
                });

               manager.cancelDeviceConnection(currentDevice.id);
               console.log("Device Disconnected")
           }}
         />
       </View>
     </View>
   );
 };
 

 
 /* const Connect = ({navigation}) => {
   return (
     <Stack.Navigator>
       <Stack.Screen
         name="Home"
         component={ConnectScreen}
         options={{
           headerRight: props => <LogoTitle {...props} />,
         }}
       />
     </Stack.Navigator>
     
     
   );
 }; */

 const styles = StyleSheet.create({
   container: {
     flex: 1
   },
   backgroundStyle: {
     backgroundColor: '#FFFFFF',
     alignItems: 'center',
     justifyContent: 'center',
     flex: 1,
   },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
   primaryButton: {
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: 12,
     paddingHorizontal: 32,
     margin: 10,
     borderRadius: 4,
     elevation: 3,
     width: 150,
     backgroundColor: '#E79532',
     borderColor: '#FFFFFF',
   },
   secondaryButton: {
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: 12,
     paddingHorizontal: 32,
     margin: 10,
     borderRadius: 4,
     elevation: 3,
     width: 150,
     backgroundColor: '#016FB9',
     borderColor: '#FFFFFF',
   },
   tertiaryButton: {
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: 12,
     paddingHorizontal: 32,
     margin: 10,
     borderRadius: 4,
     elevation: 3,
     width: 150,
     backgroundColor: '#2DD365',
     borderColor: '#FFFFFF',
   },
   buttonText: {
     color: 'white',
     fontSize: 16,
   },
   formFieldLabel: {
     marginTop: 10,
     marginBottom: 10,
     color: '#08415C',
     fontSize: 16,
   },
   formFieldTextView: {
     borderWidth: 2,
     borderColor: '#08415C',
     borderRadius: 4,
     fontSize: 16,
   },
   formFieldTextInput: {
     fontSize: 16,
     width: 300,
   },
   screenTitleHeader: {
     fontSize: 20,
     color: '#08415C',
   },
   screenTitleSubHeader: {
     fontSize: 16,
     color: '#2F9BC1',
   },
 });
 
 export default Connect;
 