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
    PermissionsAndroid,
    TouchableOpacity,
  } from 'react-native';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Images from '../image/images';
  

// const img=require('../../../circle1.png');
  // console.log(img);

const ConnectedScreen = ({navigation}) => {
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
  return (
    <View style={styles.backgroundStyle}>
      <ScrollView>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', margin:20}}>
        <Text style={styles.screenTitleHeader}>Journey Started</Text>
        <Text style={styles.screenTitleSubHeader}>Monitoring</Text>
        <View style={{flexDirection:'row', justifyContent:'flex-start',}}>
          <Text style={styles.formFieldLabelBold}>Status:</Text>
          <Text style={styles.formFieldLabel}>Connected</Text>
        </View>
      </View>
      <View
        style={{
          alignSelf:'center',
          margin: 5,
          width: 300,
          alignItems:'center',
        }}>
        <Image
          style={{ width: 250, height: 250,resizeMode:'contain' }}
          source={ Images.circle}
        />
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
          title="Connect"
          style={styles.primaryButton}
          onPress={() => navigation.navigate('menu')}>
          <Text style={styles.buttonText}>View Home</Text>
        </Pressable>
      </View>
      </ScrollView>
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
        fontSize: 24,
        color: '#08415C',
    },
    screenTitleSubHeader: {
        fontSize: 18,
        color: '#2F9BC1',
    },
    formFieldLabel: {
        marginTop: 20,
        marginBottom: 10,
        color: '#0E55A8',
        fontSize: 16,
    },
    formFieldLabelBold: {
      marginTop: 20,
      fontWeight:'bold',
      marginBottom: 10,
      color: '#0E55A8',
      fontSize: 16,
      marginRight:10,
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
    
      
});

export default ConnectedScreen;