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
    useColorScheme,
    View,
    PermissionsAndroid,
    Dimensions,
  } from 'react-native';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faArrowLeft, faCoffee } from '@fortawesome/free-solid-svg-icons';

  const MediaAlertScreen = ({navigation}) => {
  return (
    <View>
        <ImageBackground
            source={require('../../../Rectangle_121.png')}
            style={{width: '100%', height: '100%'}}>
            <ScrollView>
            <View style={{flexDirection:'row', justifyContent:'space-between', margin:10}}>
                <TouchableOpacity 
                    style={{flexDirection:'row', justifyContent:'flex-start',margin:0 }}
                    onPress ={() =>navigation.goBack()}>
                    <FontAwesomeIcon style={{color:'#fff', margin:2 }} icon={ faAngleLeft } size={30} />
                    <Text style={{ fontSize:22, color: '#fff' }}>Back</Text>
                </TouchableOpacity>
                <Image
                    style={{ width: 40, height: 40,resizeMode:'contain' }}
                    source={ require('../../../logo.png')}
                />
            </View>
            
            <View style={ styles.mediaBox}>
                <Text style={ styles.mediaText }>Media</Text>
            </View>
            <View style={ styles.textCenter}>
                <Text style={ styles.mediaTextColor}>Share</Text>
            </View>
            <View style={ styles.mediaDesign}>
                <Image
                    style={{ width: 50, height: 50,resizeMode:'contain' }}
                    source={ require('../../../image_upload.png')}
                />
                <Image
                    style={{ width: 50, height: 50,resizeMode:'contain' }}
                    source={ require('../../../image_share.png')}
                />
            </View>
            <View style={ styles.mediaGraph}>
                <Text style={ styles.mediaGraphText }>calm</Text>
                <Image
                    style={{ width: 130, height: 80,resizeMode:'contain' }}
                    source={ require('../../../graph.png')}
                />
            </View>
            <View style={ styles.mediaGraph}>
                <Text style={ styles.mediaGraphText }>Stressed</Text>
                <Image
                    style={{ width: 130, height: 80,resizeMode:'contain' }}
                    source={ require('../../../graph.png')}
                />
            </View>
            <View style={ styles.mediaGraph}>
                <Text style={ styles.mediaGraphText }>Anxious</Text>
                <Image
                    style={{ width: 130, height: 80,resizeMode:'contain' }}
                    source={ require('../../../graph.png')}
                />
            </View>
            <View style={ styles.mediaGraph}>
                <Text style={ styles.mediaGraphText }>Exercising</Text>
                <Image
                    style={{ width: 130, height: 80,resizeMode:'contain' }}
                    source={ require('../../../graph.png')}
                />
            </View>
            <View
                style={{
                    margin: 20,
                    width: 300,
                    alignSelf:'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Pressable
                    title="Log In"
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('menu')}>
                    <Text style={styles.buttonText}>Dismiss</Text>
                </Pressable>
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
    mediaBox:{
        alignItems:'center', 
        alignSelf:'center', 
        justifyContent:'center', 
        backgroundColor:'#B7B7B7', 
        margin:20, 
        height:150, 
        width:250
    },
    mediaText:{
        fontSize:22, 
        color: '#08415C',     
    },
    textCenter:{
        alignItems:'center', 
        justifyContent:'center', 
        color:'#ffffff',
    },
    mediaTextColor:{
        fontSize:22, 
        color: '#ffffff',
        fontWeight:'bold'
    },
    mediaDesign:{
        margin:10,
        alignItems:'center', 
        justifyContent:'center',
        flexDirection:'row',
    },
    mediaGraph:{
        alignItems:'center', 
        justifyContent:'space-evenly',
        flexDirection:'row',

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
        backgroundColor: '#0F5BAB',
        borderColor: '#FFFFFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    mediaGraphText:{
        fontSize:20, 
        marginTop:-10, 
        width:'30%',
        color:'#0B3249',
    },
});

export default MediaAlertScreen;