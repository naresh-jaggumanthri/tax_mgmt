import React,{useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const exampleImage2 = require('../assets/footerback.jpg');
const SplashScreen = ({navigation}) => {
    useEffect(()=>{
        checkInternet();
      
    
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
    const { colors } = useTheme();
    
        setTimeout( () => {
            
           setTimePassed();
        },5000);
      
      
      const setTimePassed=()=> {
         //this.setState({timePassed: true});
        
         navigation.navigate('SignInScreen');
      }
      
    

     

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#F6F9F3' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
       
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: '#F6F9F3'
            }]}
            animation="fadeInUpBig"
        > 
        
       
            <Text style={[styles.title, {
                color: colors.text
            }]}>Manage your Tax!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
           
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <LinearGradient
                    colors={['#FFA07A', '#FFF080']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
           
            </View>
           
        </Animatable.View>
        <ImageBackground source={exampleImage2} style={styles.image}></ImageBackground>
      </View>
      
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F6F9F3'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#F6F9F3',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30,
     
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  } ,image: {
    flex:0.5,
    resizeMode: "cover",
    justifyContent: "flex-start",
    width:'100%'
  },
});