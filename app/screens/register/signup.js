import React from 'react';
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
   TouchableOpacity,
    View,
    PermissionsAndroid,
    Dimensions,
  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Images from '../image/images';

const SignUpScreen = ({navigation}) => {
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
          source={Images.rightLogo}
        />
      ),
    });
  }, [navigation]);
      const [signUpUsernameText, onChangeSignUpUsernameText] = React.useState(null);
      const [signUpPasswordText, onChangeSignUpPasswordText] = React.useState(null);
      const [signUpConfirmPasswordText, onChangeSignUpConfirmPasswordText] =
        React.useState(null);
      // const [number, onChangeNumber] = React.useState(null);
      return (
        <View style={styles.backgroundStyle}>
         <ScrollView>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginHorizontal:20, marginVertical:20}}>
            <Text style={styles.screenTitleHeader}>Get Started</Text>
            <Text style={styles.screenTitleSubHeader}>Sign Up</Text>
          </View>
          <View
            style={{
              alignSelf:'center',
              margin: 20,
              width: 300,
            }}>
            <Text style={styles.formFieldLabel}>Username</Text>
            <View style={styles.formFieldTextView}>
              <TextInput
                style={styles.formFieldTextInput}
                onChangeText={onChangeSignUpUsernameText}
                value={signUpUsernameText}
                placeholder="Enter your username"
                keyboardType="email-address"
              />
            </View>
            <Text style={styles.formFieldLabel}>Password</Text>
            <View style={styles.formFieldTextView}>
              <TextInput
                style={styles.formFieldTextInput}
                signUpPasswordText={onChangeSignUpPasswordText}
                value={signUpPasswordText}
                placeholder="Enter your password"
                secureTextEntry={true}
              />
            </View>
            <Text style={styles.formFieldLabel}>Confirm Password</Text>
            <View style={styles.formFieldTextView}>
              <TextInput
                style={styles.formFieldTextInput}
                signUpConfirmPasswordText={onChangeSignUpConfirmPasswordText}
                value={signUpConfirmPasswordText}
                placeholder="Confirm your password"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View
            style={{
              margin: 20,
              width: 300,
              alignSelf:'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pressable
              title="Sign Up"
              style={styles.primaryButton}
              onPress={() => navigation.navigate('login')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <Text style={styles.formFieldLabel}>
              Already have an account?{' '}
              <Text
                style={{
                  color: '#08415C',
                  textDecorationLine: 'underline',
                }}
                onPress={() => navigation.navigate('login')}>
                Log In here
              </Text>
            </Text>
          </View>
          </ScrollView>
        </View>
      );
    };


const styles = StyleSheet.create({
    backgroundStyle: {
       backgroundColor: '#FFFFFF',
       flex: 1,
    },
    screenTitleHeader: {
        fontSize: 20,
        color: '#08415C',
    },
    screenTitleSubHeader: {
        fontSize: 16,
        color: '#2F9BC1',
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
        borderRadius: 15,
        fontSize: 16,
    },
    formFieldTextInput: {
        fontSize: 16,
        width: 300,
        marginLeft:15,
    },
    primaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 10,
        borderRadius: 15,
        elevation: 3,
        width: 150,
        backgroundColor: '#E79532',
        borderColor: '#FFFFFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    
});

export default SignUpScreen;
    