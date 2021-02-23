import React,{useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,Dimensions
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import * as api from "../api/auth";
import { useAuth } from "../providers/auth";
import Loader from '../components/Loader';

const SignInScreen = (props) => {
    const {navigation} = props;
    //const {navigate} = navigation;
    
 //console.log('api url=====>>>>',env.ANDROID_VERSION_CODE);
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
       
        isValidUser: true,
        isValidPassword: true,
    });
    const[dsecureTextEntry,setSecureTextEntry]=useState(true);
    const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
    const { handleLogin } = useAuth();

    const { colors } = useTheme();
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    
    

   // const  signIn  = React.useContext(AuthContext);

  
    const loginHandle =async(userName, password) => {
         setLoading(true);
           try {
            let response = await api.login(userName,password);
            if(response.count==0)
            {
                alert('user does not exists!');
                setLoading(false);
                return;
            }
            if(response.body=='' || response.body==null || response==null)
            {
                alert('Something went wrong');
            }
          
            await handleLogin(response);
            //alert(JSON.stringify(response.body[0].emailid));
           
            setLoading(false);

            //check if username is null
            let username = (response.body[0].username !== null);
            if (username) navigation.navigate('Home',{uname:username});
           // else alert("User doesn't exist");
           setusername('');
           setpassword('');
            
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }


    }

   

 
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#F6F9F3' barStyle="light-content"/>
          <Loader loading={loading}/>
          <View style={styles.header_logo}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={text => setusername(text)}
                    editable={true}
                    value={username}
                   // onChangeText={(val) => textInputChange(val)}
                   // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={dsecureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                   // onChangeText={(val) => handlePasswordChange(val)}
                   onChangeText={text => setpassword(text)}
                    editable={true}
                    value={password}
                />
                <TouchableOpacity
                    onPress={()=>{
                        dsecureTextEntry?setSecureTextEntry(false):setSecureTextEntry(true);
                        }}
                >
                    {dsecureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                       
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            {/*<TouchableOpacity>
                <Text style={{color: '#FFF080', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>*/}
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle(username,password)}}
                >
                <LinearGradient
                    colors={['#FFA07A', '#FFF080']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#000'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

               {/* <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#FFF080',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#FFF080'
                    }]}>Sign Up</Text>
                </TouchableOpacity> */}
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.16;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#F6F9F3'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    header_logo: {
      flex:2.5,
      alignItems:'center',
      justifyContent: 'center',
        
    },logo:{
        justifyContent:'center',
        alignContent:'center',
          width: height_logo,
          height: height_logo
      
      },
  });