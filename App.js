/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import { BleManager } from 'react-native-ble-plx';

import {
  Button,
  Pressable,
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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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
const SignUp = ({navigation}) => {
  const [signUpUsernameText, onChangeSignUpUsernameText] = React.useState(null);
  const [signUpPasswordText, onChangeSignUpPasswordText] = React.useState(null);
  const [signUpConfirmPasswordText, onChangeSignUpConfirmPasswordText] =
    React.useState(null);
  // const [number, onChangeNumber] = React.useState(null);
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
};
const Connect = ({navigation}) => {
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
};
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
