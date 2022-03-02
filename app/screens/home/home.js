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
  } from 'react-native';
import Images from '../image/images';
  

const Home = ({navigation}) => {
    return (
        <View>
            <ImageBackground
                source={ Images.backgroundHome }
                style={{width: '100%', height: '100%'}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        source={ Images.logoMain }
                        style={{marginBottom: 20, width: 150, height: 150}}
                    />
                    <Pressable
                        title="Log In"
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('login')}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>
                    <Pressable
                        title="Sign Up"
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('signup')}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>
                    {/* <Pressable
                        title="Connect"
                        style={styles.tertiaryButton}
                        onPress={() => navigation.navigate('Connect')}>
                        <Text style={styles.buttonText}>Connect</Text>
                    </Pressable> */}
                </View>
            </ImageBackground>
        </View>
    );
};

const styles =StyleSheet.create({

    primaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 10,
        borderRadius: 10,
        elevation: 3,
        width: 150,
        backgroundColor: '#E79532',
        borderColor: '#FFFFFF',
    },
    secondaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 10,
        borderRadius: 10,
        elevation: 3,
        width: 150,
        backgroundColor: '#016FB9',
        borderColor: '#FFFFFF',
    },
      tertiaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 10,
        borderRadius: 4,
        elevation: 3,
        width: 150,
        backgroundColor: '#2DD365',
        borderColor: '#FFFFFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
  
export default Home;