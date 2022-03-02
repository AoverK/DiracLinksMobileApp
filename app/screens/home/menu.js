import React from 'react';
import {
    Button,
    Pressable,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
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
import { faAngleLeft, faArrowLeft, faCoffee } from '@fortawesome/free-solid-svg-icons';
import Images from '../image/images';

  const MenuScreen = ({navigation}) => {
 
  return (
    <View>
        <ImageBackground
            source= { Images.backgroundImage }
            style={{width: '100%', height: '100%'}}>
            <ScrollView>
            <View style={{flexDirection:'row', justifyContent:'space-between', margin:10}}>
                <TouchableOpacity 
                    style={{flexDirection:'row', justifyContent:'flex-start',marginLeft:18 }}
                    onPress ={() =>navigation.goBack()}>
                    <FontAwesomeIcon style={{color:'#fff', margin:2 }} icon={ faAngleLeft } size={30} />
                    <Text style={{ fontSize:22, color: '#fff' }}>Back</Text>
                </TouchableOpacity>
                <Image
                    style={{ width: 40, height: 40,resizeMode:'contain' }}
                    source={ Images.rightLogoWhite }
                />
            </View>
            <View style={{flex: 1, alignItems: 'center' }}>
                <View style={{margin:0}}></View>
                <TouchableOpacity onPress={() => navigation.navigate('dashboard')}>
                    <Text style={styles.menuText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('community')}>
                    <Text style={styles.menuText}>Community</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('mediaAlert')}>
                    <Text style={styles.menuText}>Alerts</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('security')}>
                    <Text style={styles.menuText}>Security</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('account')}>
                    <Text style={styles.menuText}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('about')}>
                    <Text style={styles.menuText}>About</Text>
                </TouchableOpacity>
                <View style={{ width:'100%', height:2, backgroundColor:'#fff', margin:5}}></View>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
                <View style={{ width:'100%', height:2, backgroundColor:'#fff', margin:5, marginBottom:50}}></View>
                
            </View>
            </ScrollView>
        </ImageBackground>    
    </View>
    );
};

const styles = StyleSheet.create({
    menuText:{
        fontSize:24,
        color: '#fff',
        margin:20,
    },
});

export default MenuScreen;