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
    useColorScheme,
    View,
    TouchableOpacity,
    PermissionsAndroid,
  } from 'react-native';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
  import Images from '../image/images';
  import firebase from '../../../database/firebase';

const logInScreen = ({navigation}) => {
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

  const [logInUsernameText, onChangeLogInUsernameText] = React.useState(null);
  const [logInPasswordText, onChangeLogInPasswordText] = React.useState(null);

  userLogin = () => {

    /* constructor() {
      super();
      this.state = { 
        displayName: '',
        email: '', 
        password: '',
        isLoading: false
      }
    } */

    if(logInUsernameText === '' && logInPasswordText === '') {
      Alert.alert('Enter details to signin!')
    } else {
      /* this.setState({
        isLoading: true,
      }) */
      firebase
      .auth()
      .signInWithEmailAndPassword(logInUsernameText, logInPasswordText)
      .then((res) => {
        console.log();
        console.log(res)
        console.log('User logged-in successfully!')
        /* this.setState({
          isLoading: false,
          email: '', 
          password: ''
        }) */
        navigation.navigate('dashboard')
      })
      .catch(error => {

        console.log("Username: ", logInUsernameText);
        console.log("Password: ", logInPasswordText);
        alert(error);
        console.log(error);
      })
    }
  }
  return (
    <View style={styles.backgroundStyle}>
    <ScrollView>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', marginHorizontal:20, marginVertical:20 }}>
        <Text style={styles.screenTitleHeader}>Welcome Back</Text>
        <Text style={styles.screenTitleSubHeader}>Log In</Text>
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
            onChangeText={onChangeLogInUsernameText}
            value={logInUsernameText}
            placeholder="Enter your username"
            keyboardType="email-address"
          />
        </View>
        <Text style={styles.formFieldLabel}>Password</Text>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            onChangeText={onChangeLogInPasswordText}
            value={logInPasswordText}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
        </View>
        <Text
            onPress={() => navigation.navigate('forgotpassword')} 
            style={styles.formFieldLabel1}>Forgot Password
        </Text>
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
          title="Log In"
          style={styles.primaryButton}
          onPress={() => userLogin()}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
        <Text style={styles.formFieldLabel}>
          Don't have an account?{' '}
          <Text
            style={{
              color: '#08415C',
              textDecorationLine: 'underline',
            }}
            onPress={() => navigation.navigate('signup')}>
            Sign Up here
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
    formFieldLabel1: {
        marginTop: 15,
        marginBottom: 10,
        color: '#08415C',
        fontSize: 16,
        textDecorationLine: 'underline',
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

export default logInScreen;