/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Node, useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import base64 from 'react-native-base64';

import {BleManager} from 'react-native-ble-plx';

export const manager = new BleManager();

import {
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

function onReceiveData(data) {
  console.log(data);
}

const Stack = createNativeStackNavigator();

const LogoTitle = ({navigation}) => {
  return (
    <Image
      style={{width: 50, height: 50}}
      source={require('./DiracIcon_color_001.png')}
    />
  );
};

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <ImageBackground
        source={require('./Background_001.png')}
        style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('./TransparentLogo_001.png')}
            style={{marginBottom: 20, width: 150, height: 150}}
          />
          <Pressable
            title="Log In"
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Log In')}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
          <Pressable
            title="Sign Up"
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <Pressable
            title="Connect"
            style={styles.tertiaryButton}
            onPress={() => navigation.navigate('Connect')}>
            <Text style={styles.buttonText}>Connect</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const SignUpScreen = ({navigation}) => {
  const [signUpUsernameText, onChangeSignUpUsernameText] = React.useState(null);
  const [signUpPasswordText, onChangeSignUpPasswordText] = React.useState(null);
  const [signUpConfirmPasswordText, onChangeSignUpConfirmPasswordText] =
    React.useState(null);
  // const [number, onChangeNumber] = React.useState(null);
  return (
    <View style={styles.backgroundStyle}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.screenTitleHeader}>Get Started</Text>
        <Text style={styles.screenTitleSubHeader}>Sign Up</Text>
      </View>
      <View
        style={{
          margin: 20,
          width: 300,
        }}>
        <Text style={styles.formFieldLabel}>Email</Text>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            onChangeText={onChangeSignUpUsernameText}
            value={signUpUsernameText}
            placeholder="Enter email address"
            keyboardType="email-address"
          />
        </View>
        <Text style={styles.formFieldLabel}>Password</Text>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            signUpPasswordText={onChangeSignUpPasswordText}
            value={signUpPasswordText}
            placeholder="Enter password"
            secureTextEntry={true}
          />
        </View>
        <Text style={styles.formFieldLabel}>Confirm Password</Text>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            signUpConfirmPasswordText={onChangeSignUpConfirmPasswordText}
            value={signUpConfirmPasswordText}
            placeholder="Confirm password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View
        style={{
          margin: 20,
          width: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          title="Sign Up"
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Text>
          Already have an account?{' '}
          <Text
            style={{
              color: '#2F9BC1',
              textDecorationLine: 'underline',
            }}
            onPress={() => navigation.navigate('Log In')}>
            Log In here
          </Text>
        </Text>
      </View>
    </View>
  );
};

const LogInScreen = ({navigation}) => {
  const [logInUsernameText, onChangeLogInUsernameText] = React.useState(null);
  const [logInPasswordText, onChangeLogInPasswordText] = React.useState(null);
  return (
    <View style={styles.backgroundStyle}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.screenTitleHeader}>Welcome Back</Text>
        <Text style={styles.screenTitleSubHeader}>Log In</Text>
      </View>
      <View
        style={{
          margin: 20,
          width: 300,
        }}>
        <Text style={styles.formFieldLabel}>Email</Text>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            onChangeText={onChangeLogInUsernameText}
            value={logInUsernameText}
            placeholder="Enter username"
            keyboardType="email-address"
          />
        </View>
        <Text style={styles.formFieldLabel}>Password</Text>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            signUpPasswordText={onChangeLogInPasswordText}
            value={logInPasswordText}
            placeholder="Enter password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View
        style={{
          margin: 20,
          width: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          title="Log In"
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Log In')}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
        <Text>
          Don't have an account?{' '}
          <Text
            style={{
              color: '#2F9BC1',
              textDecorationLine: 'underline',
            }}
            onPress={() => navigation.navigate('Sign Up')}>
            Sign Up here
          </Text>
        </Text>
      </View>
    </View>
  );
};

// BlueetoothScanner does:
// - access/enable bluetooth module
// - scan bluetooth devices in the area
// - list the scanned devices
const ConnectScreen = () => {
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
          onPress={async () => {
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
                  await setDeviceCount(Object.keys(newScannedDevices).length);
                  await setScannedDevices(scannedDevices);
                  //this.manager.stopDeviceScan();
                  await device
                    .connect()
                    .then(connectedDevice => {
                      console.log('Device Connected');
                      return connectedDevice.discoverAllServicesAndCharacteristics();
                    })
                    .then(connectedDevice => {
                      console.info(connectedDevice);
                      manager.monitorCharacteristicForDevice(
                        '80:6F:B0:D6:F0:4A',
                        '0000180d-0000-1000-8000-00805f9b34fb',
                        '00002a37-0000-1000-8000-00805f9b34fb',
                        // Callback function triggered for every incoming data
                        (err, msg) => {
                          if (msg !== null) {
                            const rawData = base64.decode(msg.value);
                            // Process the data with the Action Creator
                            onReceiveData(rawData);
                            onReceiveData(msg.value);
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
          }}
        />
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
          title="Connect"
          onPress={async () => {
            currentDevice
              .connect()
              .then(() => {
                async () => {
                  const services =
                    await currentDevice.discoverAllServicesAndCharacteristics(
                      currentDevice.id,
                    );
                  alert(services);
                  setScannedServices(services);
                };
                alert('connect');
                console.log('!res success');
                let servicesAll =
                  manager.discoverAllServicesAndCharacteristics(deviceId);
                console.log('Services: ', servicesAll);

                manager
                  .discoverAllServicesAndCharacteristics(deviceId)
                  .then(info => {
                    console.log('!info', info);
                    const newScannedServices = scannedServices;
                    //newScannedServices[device.id] = device;
                    setServicesCount(Object.keys(newScannedServices).length);
                    setScannedServices(scannedDevices);
                  });
              })
              .catch(() => {
                console.log('!res error');
              });
          }}
        />
      </View>
    </View>
  );
};

/* const ConnectScreen = ({navigation}) => {
  return (
    <View style={styles.backgroundStyle}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.screenTitleHeader}>Start Your Journey</Text>
        <Text style={styles.screenTitleSubHeader}>Connect To DiracLinks</Text>
      </View>
      <View
        style={{
          margin: 20,
          width: 300,
        }}>
        <Text>
          You aren’t connected. Turn on and connect to your DiractLink to start
          your wellness journey
        </Text>
      </View>
      <View
        style={{
          margin: 20,
          width: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          title="Log In"
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Log In')}>
          <Text style={styles.buttonText}>Connect</Text>
        </Pressable>
      </View>
    </View>
  );
}; */

/* const ConnectScreen = ({navigation}) => {
  return (
    <View style={styles.backgroundStyle}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.screenTitleHeader}>Start Your Journey</Text>
        <Text style={styles.screenTitleSubHeader}>Connect To DiracLinks</Text>
      </View>
      <View
        style={{
          margin: 20,
          width: 300,
        }}>
        <Text>
          You aren’t connected. Turn on and connect to your DiractLink to start
          your wellness journey
        </Text>
      </View>
      <View
        style={{
          margin: 20,
          width: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          title="Log In"
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Log In')}>
          <Text style={styles.buttonText}>Connect</Text>
        </Pressable>
      </View>
    </View>
  );
}; */

const SignUp = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={SignUpScreen}
        options={{
          headerRight: props => <LogoTitle {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

const LogIn = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={LogInScreen}
        options={{
          headerRight: props => <LogoTitle {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

const Connect = ({navigation}) => {
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
};
/* const LogIn = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Log In Screen</Text>
      <Button
        title="Log In"
        style={styles.loginButton}
        onPress={() => navigation.navigate('Log In')}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}; */

/* const Connect = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Connect</Text>
      <Button
        title="Connect"
        style={styles.loginButton}
        onPress={() => navigation.navigate('Connect')}
      />
    </View>
  );
}; */

/* const SignUp = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Sign Up Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Sign Up" onPress={() => navigation.navigate('Sign Up')} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}; */
/* const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
    />
  );
}; */

const ProfileScreen = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  //Hide Splash screen on app load.
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Log In" component={LogIn} />
        <Stack.Screen name="Connect" component={Connect} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
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

export default App;
