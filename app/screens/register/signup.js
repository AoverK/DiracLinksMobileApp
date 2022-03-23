import React from 'react';
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
   TouchableOpacity,
    View,
    PermissionsAndroid,
    Dimensions,
  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Images from '../image/images';
import firebase from '../../../database/firebase';

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
        
        registerUser = () => {
            console.log("Username: ", signUpUsernameText);
            console.log("Password: ", signUpPasswordText);
            console.log("ConfirmPass: ", signUpConfirmPasswordText);
            if(signUpUsernameText === '' && signUpPasswordText === '') {
              Alert.alert('Enter details to signup!');
            } 
            if (signUpPasswordText != signUpConfirmPasswordText) {
                Alert.alert('Passwords not equal!');
            } else {
              /* this.setState({
                isLoading: true,
              }) */
              firebase
              .auth()
              .createUserWithEmailAndPassword(signUpUsernameText, signUpPasswordText)
              .then((res) => {
                /* res.user.updateProfile({
                  displayName: this.state.displayName
                }) */
                console.log(res);
                console.log('User registered successfully!');
                let timestamp = new Date();
                let timestampSeconds = timestamp.getTime() / 1000;
                let currentUser = firebase.auth().currentUser.uid.toString();
                //let identifierString = identifier;
                //let deviceDataString = data;
                console.log("Current User:", currentUser);
                if (currentUser != null){
                  // Create User
                  // Created account, data_current, data_historical subcollections
                  /* {"additionalUserInfo": 
                      {"isNewUser": true, "profile": {}, "providerId": "password"}, 
                    "credential": null, 
                    "operationType": "signIn", 
                    "user": {"_redirectEventId": undefined, "apiKey": "AIzaSyBpC7Bjt2HHiWznD_Y7QkTC9zFtzC8Z4zw", "appName": "[DEFAULT]", "createdAt": "1646891272346", "displayName": undefined, "email": "testa@xscapeco.com", "emailVerified": false, "isAnonymous": false, "lastLoginAt": "1646891272346", "phoneNumber": undefined, "photoURL": undefined, "providerData": [Array], "stsTokenManager": [Object], "tenantId": undefined, "uid": "ELkHaI4pFCb0GToafoNUvoT2YRE3"}} */
                  /* users [collection]
                    - {uid} [doc]
                      - account [collection] 
                      //- data_current [collection]
                      - data_historical [collection] */
                    //firebase.firestore().
                    //firebase.firestore().collection(currentUser).set({ user: currentUser, timestamp: timestamp, timestamp_seconds: timestampSeconds, identifier: identifierString, hr_name: "HR", hr_value: deviceDataString })
                    //firebase.firestore().collection('users').doc(currentUser).collection('account').doc().set({ roles: ["USER"], account: res })
                    //firebase.firestore().collection('users').doc(currentUser).set({ user: currentUser, timestamp: timestamp, timestamp_seconds: timestampSeconds, identifier: identifierString, hr_name: "HR", hr_value: deviceDataString })
                    //firebase.firestore().collection('users').doc(currentUser).doc("user_data").set({ timestamp: timestamp, identifier: identifierString, hr_name: "HR", hr_value: deviceDataString })
                    //firebase.firestore().collection('users').doc(currentUser).doc("user_data_history").add({ timestamp: timestamp, identifier: identifierString, hr_name: "HR", hr_value: deviceDataString })
                    firebase.firestore().collection('users').doc(currentUser).set({ account: {roles: ["USER"], email: res.user.email}})
                    .catch(err =>{
                        console.log(err);

                    });
                    //console.log("User data written");
                }
                /* this.setState({
                  isLoading: false,
                  displayName: '',
                  email: '', 
                  password: ''
                }) */
                navigation.navigate('login')
              })
              .catch(error => {
                console.log("Username: ", signUpUsernameText);
                console.log("Password: ", signUpPasswordText);
                  console.log(error);
                  Alert.alert(error.message);
                })      
            }
          }
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
                onChangeText={onChangeSignUpPasswordText}
                value={signUpPasswordText}
                placeholder="Enter your password"
                secureTextEntry={true}
              />
            </View>
            <Text style={styles.formFieldLabel}>Confirm Password</Text>
            <View style={styles.formFieldTextView}>
              <TextInput
                style={styles.formFieldTextInput}
                onChangeText={onChangeSignUpConfirmPasswordText}
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
              onPress={() => registerUser()}>
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
    