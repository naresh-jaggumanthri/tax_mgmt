import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import SignInScreen from './SignInScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import EditTransaction from './EditTransaction';
import ProfileScreen from './ProfileScreen';
import AboutUs from './AboutUs';
import EditProfileScreen from './EditProfileScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const RootStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
function Home () {
    return(
    <Tab.Navigator
    initialRouteName="HomeScreen"
   // activeColor="#e91e63"
   tabBarOptions={ {
               activeTintColor: 'blue',
          inactiveTintColor: 'grey',
          style: {
            backgroundColor: 'darkcerulean',
            },
            labelStyle: {
              fontSize: 13,
          },

      }
   }
    
    
    
  >
    <Tab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
       
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
      
    />
     <Tab.Screen
      name="ProfileScreen"
      component={EditProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
        
      }}
    />
    <Tab.Screen
      name="Tasks"
      component={AboutUs}
      options={{
        tabBarLabel: 'Notifications',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="book" color={color} size={26} />
        ),
       
      }}
    /> 
   
  </Tab.Navigator>
    );
};
const RootStackScreen = ({navigation}) => {return(
  
    
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={WelcomeScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignupScreen}/>
        <RootStack.Screen name="Home" component={Home}/>
        <RootStack.Screen name="EditTransaction" component={EditTransaction} options={{headerShown:true}}/>
        <RootStack.Screen name="EditProfileScreen" component={EditProfileScreen}/>
    </RootStack.Navigator>
    
);
}
export default RootStackScreen;
