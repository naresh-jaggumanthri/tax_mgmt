/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';

import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';


import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';







import RootStackScreen from './src/screens/RootStackScreen';
import { Alert } from 'react-native';
import { BackHandler } from 'react-native';
import { Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';
import NetworkUtils from './src/utils/NetworkUtils';




const App = () => {
 
  useEffect(()=>{
    checkInternet();
   checkVersion();

  },[]);

  const checkInternet=async()=>{
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if(!isConnected)
    {
        console.log('No Internet Connection Available');
        alert('No Internet Connection Available');
        
        return;
    }
  }
  const checkVersion = async () => {
    try{
    let updateNeeded = await VersionCheck.needUpdate();
    if (updateNeeded && updateNeeded.isNeeded) {
        //Alert the user and direct to the app url
        Alert.alert(
          'Please Update','You will have to update your app o the latest version to continue using.',
          [{
            text:'Update',
            onPress:()=>{
              BackHandler.exitApp();
              Linking.openURL(updateNeeded.storeUrl);
            }
          }],
          {cancelable:false},
        );
    }
  }catch(error){}
}
 const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  
  

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
    <RootStackScreen/>
    </NavigationContainer>
    </PaperProvider>
  );
}

export default App;