import React,{useState} from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import SignInScreen from './SignInScreen';
//import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
//import EditTransaction from './EditTransaction';
import ProfileScreen from './ProfileScreen';
import BookmarkScreen from './BookmarkScreen';
import AboutUs from './AboutUs';
import EditProfileScreen from './EditProfileScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthProvider,{useAuth} from '../providers/auth';




const RootStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
function Home () {
  const {state}=useAuth();
  let val;
  try{
  if(state==null || state==undefined || state.user.username==null || state.user.username==undefined )
  {
   val='Client';
   }else{
     val=state.user.username;
   }
  }catch(e){console.log(e)}

  const [username,setuname]= useState(val);
 
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
      initialParams={{ uname: username}}
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
  
    <AuthProvider>
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={WelcomeScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="Home" component={Home} initialParams={{ uname: 'Client' }}/>
      <RootStack.Screen name="BookmarkScreen" component={BookmarkScreen}/> 
    </RootStack.Navigator>
    </AuthProvider>
);
}
export default RootStackScreen;
