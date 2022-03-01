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
  } from 'react-native';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
  
const SecurityScreen = ({navigation}) => {

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
          source={ require('../../../DiracIcon_color_001.png')}
        />
      ),
    });
  }, [navigation]);

  const [logInConfirmPasswordText, onChangeLogInConfirmPasswordText] = React.useState(null);
  const [logInPasswordText, onChangeLogInPasswordText] = React.useState(null);
  return (
    <View style={styles.backgroundStyle}>
      <ScrollView>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', margin:30}}>
        <Text style={styles.screenTitleHeader}>Stay Safe</Text>
        <Text style={styles.screenTitleSubHeader}>Security</Text>
      </View>
      <View
        style={{
          alignSelf:'center',
          width: 300,
        }}>
        <Text style={styles.formFieldLabel1}>Update your current password to a new password.</Text>
        <Text style={styles.formFieldLabel}>Password</Text>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            onChangeText={onChangeLogInPasswordText}
            value={logInPasswordText}
            placeholder="Enter your Password"
            secureTextEntry={true}
          />
        </View>
        <Text style={styles.formFieldLabel}>Confirm Password</Text>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            onChangeText={onChangeLogInConfirmPasswordText}
            value={logInConfirmPasswordText}
            placeholder="Confirm your Password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View
        style={{
          margin: 20,
          width: 350,
          alignSelf:'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          title="Reset Password"
          style={styles.primaryButton}
          onPress={() => navigation.navigate('login')}>
          <Text style={styles.buttonText}>Change Password</Text>
        </Pressable>
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
        marginTop: 10,
        marginBottom: 10,
        color: '#0E55A8',
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
        width: 180,
        backgroundColor: '#E79532',
        borderColor: '#FFFFFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        width:150,
        textAlign:'center'
    },
    
      
});

export default SecurityScreen;