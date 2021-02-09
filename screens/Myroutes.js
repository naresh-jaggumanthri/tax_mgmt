import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/SignInScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AboutUsScreen from "../screens/AboutUs";
import EditProfileScreen from "../screens/EditProfileScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AboutUs from '../screens/AboutUs';
import EditTransaction from '../screens/EditTransaction';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();


function  Home() {
  let hideTab=true;
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="#e91e63"
     
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
         
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        
      />
       <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutUsScreen}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={color} size={26} />
          ),
         
        }}
      /> 
     
    </Tab.Navigator>
  );
}


const Myroutes = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen}  options={{headerShown:false}} />
      
      
      <Stack.Screen name="SignUpScreen" component={SignupScreen} options={{headerShown:false}}/>

        <Stack.Screen name="SignInScreen" component={LoginScreen} options={{headerShown:false,tabBarVisible:false}} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}  />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown:false}}
        />
       
       <Stack.Screen name="EditTransaction" component={EditTransaction} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Myroutes;