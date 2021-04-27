import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Image
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';
import {SMALL_FONT_SIZE,FONT_REGULAR} from '../styles/Const';
import * as api from "../api/auth";
import Loader from '../components/Loader';
import { useAuth } from "../providers/auth";
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';



const exampleImage = require('../assets/avatar.jpg');

const Updatemessage = (props) => {

  const uid=props.route.params.id;
  const mmsg=props.route.params.msg;
  const msgid=props.route.params.msgid;
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
 
  const {colors} = useTheme();
 
  const [msg,setMsg]=useState(mmsg);
  


//1 - DECLARE VARIABLES
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const { state, updateUser } = useAuth();
const [isInitiated,setInitiated]=useState(true);
const [mydata, setMydata] = useState([]);
const [adminId,setAdminId]=useState(uid);
const [mid,setMid]=useState(msgid);


useEffect(() => {
 
    getAdmins(uid,mmsg,msgid);
  
}, [isInitiated]); // Only re-run the effect if count changes







const onUpdateProfile=async(id,userid,msg)=>{
  
 try{
  setLoading(true);
  let response;
  
  response=await api.updateMessageContent(id,userid,msg);
  
  console.log(JSON.stringify(response));
  if(response && response.count!=0)
  {
    setLoading(false);
    alert('Messsage created successfully');
  }
  if(response==null || response=='')
  {
    setLoading(false);
    alert('Something went wrong');
  }
}catch (e) {
       setLoading(false);
    throw handler(e);
    
    
}
  setLoading(false);
}

  const getAdmins = async(uid,msg,msgid) =>{
    
    let adminlistdata = [];

    setMsg(msg);
    setAdminId(uid);
    setMid(msgid);

   // const {state, handleLogout} = useAuth();
   // setLoading(true);
    let res = await api.getUserList();
    
    if (res && res.body != null) {
     /* let newFile = res.body.map((file) => {
        return {...file, key4: 'Invoice'};
      }); */
      let newFile = res.body;
      
      console.log(JSON.stringify(newFile));
      adminlistdata = newFile;
    } else if (res.body == '') {
      alert('Something went wrong');
    }
   
   // alert(JSON.stringify(adminlistdata));
   let finaldata=[];
    adminlistdata.map((item)=>{
 
        console.log(item.username);
        console.log(item.id);
        finaldata.push({
            label:item.username,
            value:item.id
        });
      
    });

    setMydata(finaldata);

   
    setLoading(false);
  }
  
  
  renderHeader = () => { 
      
    
    return(
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
    
  )};

 
  

  return (
    <ScrollView>

    <View style={styles.container}>
    <View style={{alignItems:'flex-start',justifyContent:'flex-start',padding:10}}>
          <TouchableOpacity
                 onPress={()=>{
           props.navigation.navigate('HomeScreen');
          }}
                >
                         <Feather 
                        name="arrow-left"
                        color="red"
                        size={23}
                        style={{fontStyle:'bold'}}
                    />
                   
                </TouchableOpacity>

          </View>
      <Loader loading={loading}></Loader>
             
               <View style={styles.action}>
       
       <FontAwesome name="user-o" color={colors.text} size={20} /><Text style={{fontSize: SMALL_FONT_SIZE, 
                     fontFamily: FONT_REGULAR,
                     marginLeft: 8,
                     paddingVertical:0}}>Select user</Text>
     </View>
        <DropDownPicker
    items={mydata}
    defaultValue={'Select user'}
    containerStyle={{height: 100,padding:10,margin:10}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => setAdminId(item.value)}
/>

<View style={styles.action}>
       
       <FontAwesome name="envelope-o" color={colors.text} size={20} /><Text style={{fontSize: SMALL_FONT_SIZE, 
                     fontFamily: FONT_REGULAR,
                     marginLeft: 8,
                     paddingVertical:0}}>Write Message</Text>
     </View>
       <View style={styles.actionn}>
        
         <TextInput
           placeholder={msg}
           value={msg}
           placeholderTextColor="#666666"
           
           autoCorrect={false}
           style={[
             styles.textInput,
             {
               color: colors.text,
             },
           ]}
           onChangeText={text => setMsg(text)}
           editable={true}
           multiline={true}
         />
       </View>

        <TouchableOpacity style={styles.commandButton} onPress={() => {
        onUpdateProfile(mid,adminId,msg);
        }}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Updatemessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF080',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
   
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FFF080',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    
  },
  actionn: {
    flexDirection: 'row',
    height:200,
    borderBottomWidth: 1,
    borderBottomColor: '#ff04',
    
    paddingBottom: 2,
    backgroundColor: 'lightgrey',
    
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    textAlign:'justify'
  },
});