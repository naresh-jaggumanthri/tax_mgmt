import React,{useState} from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import SignInScreen from './SignInScreen';
//import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import HomeScreenAdmin from './HomeScreenAdmin';
import HomeScreenSuperAdmin from './HomeScreenSuperAdmin';
//import EditTransaction from './EditTransaction';
import ProfileScreen from './ProfileScreen';
import BookmarkScreen from './BookmarkScreen';
import AboutUs from './AboutUs';
import EditProfileScreen from './EditProfileScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthProvider,{useAuth} from '../providers/auth';
import Adminlist from './Adminlist';
import Userslist from './Userslist';
import EditAdminProfileScreen from './EditAdminProfileScreen';
import AddProfile from './AddProfileScreen';
import Messagelist from './Messageslist';
import Addmessage from './Addmessage';
import UpdateMessage from './Updatemessage';



//const {state, handleLogout} = useAuth();
const RootStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
function Home () {
  const {state}=useAuth();
  let val;
  let usertype;
  try{
  if(state==null || state==undefined || state.user.username==null || state.user.username==undefined )
  {
   val='Client';
   }else{
     val=state.user.username;
     usertype=state.user.usertype;
     console.log("usertype==>:",usertype);
   }
  }catch(e){console.log(e)}

  const [username,setuname]= useState(val);
 
    return(username!=null?
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
          
          keyboardHidesTabBar: true,
          
        }
   }
   


   
    
    
  >
    <Tab.Screen
      name="HomeScreen"
      component={usertype=='User'?HomeScreen:usertype=='Admin'?HomeScreenAdmin:HomeScreenSuperAdmin}
      
      options={({ route }) => ({
       
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      })}
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

{/*<Tab.Screen
      name="logout"
      component={Logout}
      options={{
        
        tabBarLabel: 'Logout',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="power" color={color} size={26} />
        ),
             


       
      }}
      
    /> */} 
   
   
  </Tab.Navigator>
    :null);
};


const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (routeName === 'SignInScreen') {
    return false;
  }

  return true;
}
const Logout =()=>
{
  const {state,handleLogout}=useAuth();
 // state.user.username=null;
handleLogout();

//RootStackScreen.Navigator.name("SignInScreen");

return(<RootStackScreen/>); 

  
}
const RootStackScreen = ({navigation}) => {return(
  
    <AuthProvider>
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={WelcomeScreen}   />
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="Home" component={Home} initialParams={{ uname: 'Client' }}/>
        
      <RootStack.Screen name="BookmarkScreen" component={BookmarkScreen} initialParams={{id:0}}/>
      <RootStack.Screen name="Userslist" component={Userslist}/> 
      <RootStack.Screen name="Adminlist" component={Adminlist}/>  
      <RootStack.Screen name="AddProfile" component={AddProfile}/> 
      <RootStack.Screen name="Messages" component={Messagelist}/>
      <RootStack.Screen name="AddMessage" component={Addmessage}/>
      <RootStack.Screen name="UpdateMessage" component={UpdateMessage}/>
      <RootStack.Screen name="EditAdminProfile" component={EditAdminProfileScreen} initialParams={{id:0}}/>  
    </RootStack.Navigator>
    </AuthProvider>
);
}
export default RootStackScreen;
