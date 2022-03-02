import React from 'react';
import {
    Pressable,
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
import Images from '../image/images';

const AlertsScreen = ({navigation}) => {

  return (
    <View style={styles.backgroundStyle}>
      <ScrollView>
      <View style={{flexDirection:'row', justifyContent:'space-between', margin:10 }}>
        <View style={{flexDirection:'row', justifyContent:'space-between', margin:10, width:'35%' }}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('dashboard')}
                style={{flexDirection:'row', justifyContent:'space-between', width:100, paddingTop:-3}}>
                <Image
                    style={{ width: 24, height: 24,resizeMode:'contain' , margin:4}}
                    source={ Images.homeIcon }
                />
                <Text style={styles.screenTitleHeader}>Home</Text>
            </TouchableOpacity>
           
            <TouchableOpacity 
                onPress={() => navigation.navigate('alerts')}
                style={{flexDirection:'row', justifyContent:'space-between', width:100, marginLeft:10,borderBottomWidth: 2,
                borderBottomColor: '#E7A257',}}>
                <Image
                    style={{ width: 24, height: 24,resizeMode:'contain' , margin:4}}
                    source={ Images.bellIcon }
                />
                <Text style={styles.screenTitleHeader}>Alerts</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('menu')}>
            <Image
                style={{ width: 40, height: 40,resizeMode:'contain' }}
                source={ Images.rightLogo }
            />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          alignSelf:'center',
          width: 350,
          alignItems:'center',
        }}>
        <Text onPress={() => navigation.navigate('alertsDetail')} style={styles.screenTitleHeader}>Alerts</Text>
      </TouchableOpacity>
      <View style={{backgroundColor:'#F3F0F0'}}>
        <View style={styles.alermMainView}>
            <View style={styles.alermView}>
                <Image
                style={{ width: 80, height: 80,resizeMode:'contain' }}
                source={ Images.threeCircle }
                />
                <View>
                    <Text style={styles.alermTimeText}>2:00pm</Text>
                    <Text style={styles.alermDateText}>Dec 12, 2021</Text>
                </View>
            </View>
            <Image
                onProgress={() => navigation.navigate('alertsDetail')}
                style={{ width: 40, height: 40,resizeMode:'contain', marginTop:10 }}
                source={ Images.threeDots }
            />
        </View>

        <View style={styles.alermMainView}>
            <View style={styles.alermView}>
                <Image
                style={{ width: 80, height: 80,resizeMode:'contain' }}
                source={ Images.threeCircle }
                />
                <View>
                    <Text style={styles.alermTimeText}>2:00pm</Text>
                    <Text style={styles.alermDateText}>Dec 12, 2021</Text>
                </View>
            </View>
            <Image
            style={{ width: 40, height: 40,resizeMode:'contain', marginTop:10 }}
            source={ Images.threeDots }
            />
        </View>
        <View style={styles.alermMainView}>
            <View style={styles.alermView}>
                <Image
                style={{ width: 80, height: 80,resizeMode:'contain' }}
                source={ Images.threeCircle }
                />
                <View>
                    <Text style={styles.alermTimeText}>2:00pm</Text>
                    <Text style={styles.alermDateText}>Dec 12, 2021</Text>
                </View>
            </View>
            <Image
            style={{ width: 40, height: 40,resizeMode:'contain', marginTop:10 }}
            source={ Images.threeDots }
            />
        </View>

        <View style={styles.alermMainView}>
            <View style={styles.alermView}>
                <Image
                style={{ width: 80, height: 80,resizeMode:'contain' }}
                source={ Images.threeCircle }
                />
                <View>
                    <Text style={styles.alermTimeText}>2:00pm</Text>
                    <Text style={styles.alermDateText}>Dec 12, 2021</Text>
                </View>
            </View>
            <Image
            style={{ width: 40, height: 40,resizeMode:'contain', marginTop:10 }}
            source={ Images.threeDots }
            />
        </View>

        <View style={styles.alermMainView}>
            <View style={styles.alermView}>
                <Image
                style={{ width: 80, height: 80,resizeMode:'contain' }}
                source={ Images.threeCircle }
                />
                <View>
                    <Text style={styles.alermTimeText}>2:00pm</Text>
                    <Text style={styles.alermDateText}>Dec 12, 2021</Text>
                </View>
            </View>
            <Image
            style={{ width: 40, height: 40,resizeMode:'contain', marginTop:10 }}
            source={ Images.threeDots }
            />
        </View>

        <View style={styles.alermMainView}>
            <View style={styles.alermView}>
                <Image
                style={{ width: 80, height: 80,resizeMode:'contain' }}
                source={ Images.threeCircle }
                />
                <View>
                    <Text style={styles.alermTimeText}>2:00pm</Text>
                    <Text style={styles.alermDateText}>Dec 12, 2021</Text>
                </View>
            </View>
            <Image
            style={{ width: 40, height: 40,resizeMode:'contain', marginTop:10 }}
            source={ Images.threeDots }
            />
        </View>
    </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    backgroundStyle: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      height:'100%'
    },
    screenTitleHeader: {
        fontSize: 24,
        color: '#08415C',
    },
    screenTitleHeaderUnderLine: {
        color: '#E7A257',
        textDecorationLine: 'underline',
        textDecorationColor:'#E7A257',
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
    alermMainView:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        margin:10, 
    },
    alermView:{
        flexDirection:'row', 
        justifyContent:'space-around', 
        width:'70%'
    },
    alermTimeText:{
        fontSize:24, 
        color:'#DD6D07',
    },
    alermDateText:{
        fontSize:20, 
        color:'#3B70B4',
    },
      
});

export default AlertsScreen;