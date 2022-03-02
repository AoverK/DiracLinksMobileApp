import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    PermissionsAndroid,
    Dimensions,
  } from 'react-native';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Images from '../image/images';
  
const AboutScreen = ({navigation}) => {
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
          source={ Images.rightLogo}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.backgroundStyle}>
      <View style={{alignItems: 'center', justifyContent: 'center', margin:10, marginVertical:80}}>
        <Text style={styles.screenTitleHeader}>About DiracLinks</Text>
      </View>
      <View style={{ alignSelf:'flex-start', margin:30}}>
        <Text style={styles.screenTitleHeader}>About DiracLinks</Text>
      </View>
    
      <View style={{alignSelf: 'flex-start', justifyContent:'flex-end', margin:30, marginTop:150}}>
        <Text style={styles.screenTitleHeader}>Version</Text>
        <Text style={styles.screenTitleHeader}>1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    backgroundStyle: {
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      flex: 1,
      padding:30,
    },
    screenTitleHeader: {
        fontSize: 20,
        color: '#000000',
    },
});

export default AboutScreen;