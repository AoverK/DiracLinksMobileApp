import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import Home from './screens/home/home';
import logInScreen from './screens/register/login';
import SignUpScreen from './screens/register/signup';
import PasswordScreen from './screens/register/forgotpassword';
import DisconnectedScreen from './screens/home/disconnected';
import ConnectedScreen from './screens/home/connected';
import CommunityScreen from './screens/home/community';
import SettingScreen from './screens/home/settings';
import SecurityScreen from './screens/register/security';
import MenuScreen from './screens/home/menu';
import TestingScreen from './screens/home/testing';
import AboutScreen from './screens/home/about';
import DashboardScreen from './screens/home/dashboard';
import AccountScreen from './screens/home/account';
import AlertsScreen from './screens/home/alerts';
import AlertsDetailScreen from './screens/home/alertsDetail';
import MediaAlertScreen from './screens/home/mediaAlert';

const Stack = createNativeStackNavigator();

const LogoTitle = () => {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={ require('../DiracIcon_color_001.png')}
      />
    );
};

const BackButton = ({ navigation}) => {
    return (
        <TouchableOpacity 
            style={{flexDirection:'row', justifyContent:'flex-start',margin:10 }}
            onPress ={() => navigation.goBack()}>
            <FontAwesomeIcon style={{color:'black', margin:2 }} icon={ faAngleLeft } size={30} />
            <Text style={{ fontSize:22, color: 'black' }}>Back</Text>
        </TouchableOpacity>
    );
};
  
const Route = ({navigation}) => {
    
    return (
     
        <Stack.Navigator initialRouteName='home' >
            <Stack.Screen
                name="home"
                component={ Home }
                options={{headerShown:false  }}
            />
            <Stack.Screen
                name="login"
                component={logInScreen}
                options={() => ({
                    headerShown:true,
                    headerRight: props => <LogoTitle {...props} />,
                    headerLeft: props => <BackButton {...props} />,
                    title: '',
                })}
            />
            <Stack.Screen
                name="signup"
                component={SignUpScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                    headerLeft: props => <BackButton {...props} />,
                    title: '',
                }}
            />
            <Stack.Screen
                name="forgotpassword"
                component={PasswordScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                }}
            />
            <Stack.Screen
                name="disconnected"
                component={DisconnectedScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                    headerLeft: props => <BackButton {...props} />,
                    title: '',
                }}
            />
            <Stack.Screen
                name="connected"
                component={ConnectedScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                }}
            />
            <Stack.Screen
                name="community"
                component={CommunityScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                    headerLeft: props => <BackButton {...props} />,
                    title: '',
                }}
            />
            <Stack.Screen
                name="settings"
                component={SettingScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                    headerLeft: props => <BackButton {...props} />,
                    title: '',
                }}
            />
            <Stack.Screen
                name="security"
                component={SecurityScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                    headerLeft: props => <BackButton {...props} />,
                    title: '',

                }}
            />
            <Stack.Screen
                name="menu"
                component={MenuScreen}
                options={{ 
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name="testing"
                component={TestingScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                    headerLeft: props => <BackButton {...props} />,
                    title: '',
                }}
            />
            <Stack.Screen
                name="about"
                component={AboutScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                    headerLeft: props => <BackButton {...props} />,
                    title: '',
                }}
            />
            <Stack.Screen
                name="dashboard"
                component={DashboardScreen}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name="account"
                component={AccountScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                    headerLeft: props => <BackButton {...props} />,
                    title: '',
                }}
            />
            <Stack.Screen
                name="alerts"
                component={AlertsScreen}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name="alertsDetail"
                component={AlertsDetailScreen}
                options={{
                    headerRight: props => <LogoTitle {...props} />,
                    headerLeft: props => <BackButton {...props} />,
                    title: '',
                }}
            />
            <Stack.Screen
                name="mediaAlert"
                component={MediaAlertScreen}
                options={{ 
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
        
    );
};

export default Route;