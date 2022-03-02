import React from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Images from '../image/images';

const DisconnectedScreen = ({navigation}) => {
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
        <Text style={styles.screenTitleHeader}>Start Your Journey</Text>
        <Text style={styles.screenTitleSubHeader}>Connect To DirectLinks</Text>
        <Text style={styles.formFieldLabel}>Status: Disconnected</Text>
      </View>
      <View
        style={{
          alignSelf:'center',
          margin: 20,
          width: 300,
        }}>
        <Text style={styles.formFieldLabel}>You aren't connected. Turn on and connect to your DirectLink to start your wellness journey</Text>

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
          onPress={() => navigation.navigate('connected')}>
          <Text style={styles.buttonText}>Connect</Text>
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

export default DisconnectedScreen;