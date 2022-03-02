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
    Dimensions,
  } from 'react-native';
import Images from '../image/images';

const TestingScreen = ({navigation}) => {

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
      <View style={{alignItems: 'flex-start', justifyContent: 'center', margin:30}}>
        <Text style={styles.screenTitleHeader}>Improve App</Text>
        <Text style={styles.screenTitleSubHeader}>Testing</Text>
      </View>
      <View
        style={{
          alignSelf:'center',
          margin: 10,
          width: 300,
        }}>
        <Text style={styles.formFieldLabel}>Simulate DiracLinks data. This is for developer testing of app when no DiracLinks monitor is connected.</Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center', margin:10}}>
        <Text style={styles.screenTitleHeader}>Simulate Data</Text>
        <Image 
            style={{ width: 150, height: 70,resizeMode:'contain', margin:10 }}
            source={ Images.testing }>
        </Image>
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
        color: '#0B49A7',
        fontSize: 16,
    },
});

export default TestingScreen;