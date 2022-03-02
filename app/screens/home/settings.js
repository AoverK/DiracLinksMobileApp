import React from 'react';
import {
    Button,
    Pressable,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    PermissionsAndroid,
    Dimensions,
  } from 'react-native';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Images from '../image/images';
  
const SettingScreen = ({navigation}) => {
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
  const [logInUsernameText, onChangeLogInUsernameText] = React.useState(null);
  const [logInPasswordText, onChangeLogInPasswordText] = React.useState(null);
  return (
    <View style={styles.backgroundStyle}>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', margin:30}}>
        <Text style={styles.screenTitleHeader}>Update Account</Text>
        <Text style={styles.screenTitleSubHeader}>Settings</Text>
      </View>
      <View
        style={{
          alignSelf:'center',
          margin: 20,
          width: 300,
        }}>
        <Text style={styles.formFieldLabel}>Update your current email address to a new email address.</Text>

        <Text style={styles.formFieldLabel1}>New Email Address</Text>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            onChangeText={onChangeLogInUsernameText}
            value={logInUsernameText}
            placeholder="Enter your email"
            keyboardType="email-address"
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
          onPress={() => navigation.navigate('menu')}>
          <Text style={styles.buttonText}>Change Email</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    backgroundStyle: {
      backgroundColor: '#FFFFFF',
      // alignItems: 'center',
      // justifyContent: 'center',
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
        color: '#0B49A7',
        fontSize: 16,
    },
    formFieldLabel1: {
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
        width: 180,
        backgroundColor: '#E79532',
        borderColor: '#FFFFFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    screenListHeader:{
        flexDirection:'row', 
        justifyContent:'space-around', 
        width:Dimensions.get('screen').width-100,
        backgroundColor:'#F2F0F0',
        margin:10,
    },
    screenList:{
        marginRight:30,
        fontSize: 16,
        color: '#08415C',
    },
      
});

export default SettingScreen;