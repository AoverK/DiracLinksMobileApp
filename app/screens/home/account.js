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
  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Images from '../image/images';

const AccountScreen = ({navigation}) => {
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
  const [cardName, onChangeCardName] = React.useState(null);
  const [cardNumber, onChangeCardNumber] = React.useState(null);
  const [cvvNumber, onChangeCvvNumber] = React.useState(null);
  const [expiaryDate, onChangeExpiaryDate] = React.useState(null);
  const [zipCode, onChangeZipCode] = React.useState(null);
  return (
    <View style={styles.backgroundStyle}>
    <ScrollView>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', marginHorizontal:20, marginVertical:20 }}>
        <Text style={styles.screenTitleHeader}>Account</Text>
        <Text style={styles.screenTitleSubHeader}>Subscription</Text>
      </View>
      <View
        style={{
          alignSelf:'center',
          width: 350,
        }}>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            onChangeText={onChangeCardName}
            value={cardName}
            placeholder="Name on card"
          />
        </View>
        <View style={styles.formFieldTextView}>
          <TextInput
            style={styles.formFieldTextInput}
            onChangeText={onChangeCardNumber}
            value={cardNumber}
            placeholder="Card number"
            keyboardType='numeric'
          />
        </View>
        <View style={styles.formFieldCardDetail}>
            <View style={styles.formFieldTextView}>
            <TextInput
                style={styles.formFieldTextInputCard}
                onChangeText={onChangeCvvNumber}
                value={cvvNumber}
                placeholder="CVV"
                keyboardType='numeric'
                secureTextEntry={true}
            />
            </View>
            <View style={styles.formFieldTextView}>
            <TextInput
                style={styles.formFieldTextInputCard}
                onChangeText={onChangeExpiaryDate}
                value={expiaryDate}
                placeholder="Exp"
            />
            </View>
            <View style={styles.formFieldTextView}>
            <TextInput
                style={styles.formFieldTextInputCard}
                onChangeText={onChangeZipCode}
                value={zipCode}
                placeholder="Zipcode"
                keyboardType='numeric'
            />
            </View>
        </View>
      </View>
      <View
        style={{
          margin: 30,
          width: 300,
          alignSelf:'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          title="Log In"
          style={styles.primaryButton}
          onPress={() => navigation.navigate('menu')}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </Pressable>
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
          title="Log In"
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('menu')}>
          <Text style={styles.buttonText}>Cancel Subscription</Text>
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
        fontSize: 26,
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
        margin:5,
    },
    formFieldTextInput: {
        fontSize: 16,
        width: 300,
        marginLeft:10,
    },
    formFieldCardDetail:{
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    formFieldTextInputCard: {
        fontSize: 16,
        width: 90,
        marginLeft:10,
    },
    primaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 15,
        borderRadius: 15,
        elevation: 3,
        width: 210,
        backgroundColor: '#2DCE53',
        borderColor: '#FFFFFF',
    },
    secondaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 10,
        borderRadius: 15,
        elevation: 3,
        width: 210,
        backgroundColor: '#F70008',
        borderColor: '#FFFFFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    
      
});

export default AccountScreen;