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
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Images from '../image/images';

const AlertsDetailScreen = ({navigation}) => {
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
          <FontAwesomeIcon style={{color:'black', margin:2 }} icon={ faAngleLeft  } size={30} />
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
  const media = ["Select Media...", "Select Media...", "Select Media...", "Select Media..."]
  return (
    <View style={styles.backgroundStyle}>
    <ScrollView>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', marginHorizontal:20, marginVertical:20 }}>
        <Text style={styles.screenTitleHeader}>Setup media</Text>
        <Text style={styles.screenTitleSubHeader}>Alerts</Text>
      </View>
      <View
        style={{
          alignSelf:'center',
          margin: 20,
          width: 300,
        }}>
        <Text style={styles.formFieldLabel}>Setup your alerts to display media depending on your wellness state</Text>

        <View style={{flexDirection:'row', justifyContent:'space-between' }}>
          <Text style={ styles.selectMedia}>Calm</Text>
          <View style={styles.dropDown}>
            <Text style={styles.dropDownText}>Select Media ...</Text>
            {/* <SelectDropdown
            
              style={styles.dropDown}
              data={media}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item 
            }}
            /> */}
             <FontAwesomeIcon style={ styles.dropDownIcon} icon={ faChevronDown } size={26} />
          </View>
        </View>

        <View style={{flexDirection:'row', }}>
          <Text style={ styles.selectMedia}>Stressed</Text>
          <View style={styles.dropDown} containerStyle={styles.shadow}>
          <Text style={ styles.dropDownText }>Select Media ...</Text>

            {/* <SelectDropdown
            style={styles.dropDown}
              data={media}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item 
            }}
            /> */}
            <FontAwesomeIcon style={ styles.dropDownIcon} icon={ faChevronDown } size={26} />
          </View>
        </View>
        <View style={{flexDirection:'row', }}>
          <Text style={ styles.selectMedia}>Anxious</Text>
          <View style={styles.dropDown} containerStyle={styles.shadow}>
          <Text style={ styles.dropDownText }>Select Media ...</Text>
            {/* <SelectDropdown
            style={ styles.dropDown}
              data={media}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item 
            }}
            /> */}
            <FontAwesomeIcon style={ styles.dropDownIcon} icon={ faChevronDown } size={30} />

          </View>
        </View>
        <View style={{flexDirection:'row', }}>
          <Text style={ styles.selectMedia}>Exercising</Text>
          <View style={styles.dropDown} containerStyle={styles.shadow}>
          <Text style={ styles.dropDownText }>Select Media ...</Text>
            {/* <SelectDropdown
              data={media}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item 
            }}
            /> */}
            <FontAwesomeIcon style={ styles.dropDownIcon} icon={ faChevronDown } size={26} />
          </View>
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
          title="Log In"
          style={styles.primaryButton}
          onPress={() => navigation.navigate('menu')}>
          <Text style={styles.buttonText}>Save Alerts</Text>
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
        // marginTop: 10,
        marginBottom: 10,
        color: '#0B49A7',
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
    selectMedia:{
      width:'30%', 
      fontSize:16,
      color: '#08415C',
      justifyContent:'center',
      alignSelf:'center',
      // marginTop:20,
    },
    dropDown: {
      backgroundColor: 'white',
      borderWidth: 2,
      marginTop: 10,
      borderColor: '#08415C',
      borderRadius: 10,
      flexDirection:'row',
      justifyContent:'space-between',
      width:'70%'
    },
    dropDownText:{
      color:'#08415C', 
      padding:6, 
      fontSize:16, 
      width:174, 
      borderRightWidth:2, 
      borderRightColor:'#08415C',
    },
    dropDownIcon:{
      color:'#E79532', 
      margin:2, 
      paddingRight:5, 
    },
});

export default AlertsDetailScreen;