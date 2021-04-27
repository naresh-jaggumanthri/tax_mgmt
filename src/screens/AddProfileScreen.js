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

const AddProfileScreen = (props) => {

    const utype=props.route.params.usertype;
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
  const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;
  const [image, setImage] = useState(exampleImageUri);
  const {colors} = useTheme();
  const [userName,setuserName]=useState('');
  const [company,setCompany]=useState('');
  const [mobile,setMobile]=useState('');
  const [email,setEmail]=useState('');
  const [address,setAddress]=useState('');
  const [contact,setContact]=useState('');


//1 - DECLARE VARIABLES
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const { state, updateUser } = useAuth();
const [isInitiated,setInitiated]=useState(true);
const [mydata, setMydata] = useState([]);
const [adminId,setAdminId]=useState(0);


useEffect(() => {
  if(utype=='User')
  {
    getAdmins();
  }
}, [isInitiated]); // Only re-run the effect if count changes



bs3 = React.createRef();
  fall3 = new Animated.Value(1); 



const onUpdateProfile=async(userName,company,mobile,email,address,contact)=>{
  
 try{
  setLoading(true);
  let response;
  if(state.user.usertype=='Admin')
  {
    setAdminId(state.user.id);
  }
  if(utype=='User')
  {
    response=await api.addMobileProfile(adminId,image,userName,company,mobile,email,address,contact);
  }else
  {
  response=await api.addAdminProfile(adminId,image,userName,company,mobile,email,address,contact);
  }
  console.log(JSON.stringify(response));
  if(response && response.count!=0)
  {
    setLoading(false);
    alert('New user added successfully');
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

  const getAdmins = async() =>{
    
    let adminlistdata = [];

   // const {state, handleLogout} = useAuth();
   // setLoading(true);
    let res = await api.getAdminList();
    
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
  
  const callBottomSheet=()=>{
    try{
     
      this.bs3.current.snapTo(0);
    }catch(e){
      console.log(e);
    }
  }
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs3.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs3.current.snapTo(1);
    });
  }

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs3.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

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
      <BottomSheet
        ref={this.bs3}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall3}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(this.fall3, 1.0)),
    }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>
          callBottomSheet()
          }>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#000"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#000',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
          {userName}
          </Text>
        </View>
        <View style={styles.action}>
       
        <FontAwesome name="user-o" color={colors.text} size={20} /><Text style={{fontSize: SMALL_FONT_SIZE, 
                        fontFamily: FONT_REGULAR,
                        marginLeft: 8,
                        paddingVertical:0}}>User Name</Text>
        </View>
        <View style={styles.actionn}>
          <TextInput
            placeholder={userName}
            value={userName}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]} 
            onChangeText={text => setuserName(text)}
            editable={true}
          />
        </View>
        <View style={styles.action}>
       
       <FontAwesome name="user-o" color={colors.text} size={20} /><Text style={{fontSize: SMALL_FONT_SIZE, 
                       fontFamily: FONT_REGULAR,
                       marginLeft: 8,
                       paddingVertical:0}}>Company</Text>
       </View>
        <View style={styles.actionn}>
         
          <TextInput
            placeholder={company}
            value={company}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={text => setCompany(text)}
            editable={true}
          />
        </View>
        <View style={styles.action}>
       
        <Feather name="phone" color={colors.text} size={20} /><Text style={{fontSize: SMALL_FONT_SIZE, 
                       fontFamily: FONT_REGULAR,
                       marginLeft: 8,
                       paddingVertical:0}}>Phone</Text>
       </View>
        <View style={styles.actionn}>
         
          <TextInput
            placeholder={mobile}
            value={mobile}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={text => setMobile(text)}
            editable={true}
          />
        </View>
        <View style={styles.action}>
       
        <FontAwesome name="envelope-o" color={colors.text} size={20} /><Text style={{fontSize: SMALL_FONT_SIZE, 
                      fontFamily: FONT_REGULAR,
                      marginLeft: 8,
                      paddingVertical:0}}>Email</Text>
      </View>
        <View style={styles.actionn}>
         
          <TextInput
            placeholder={email}
            value={email}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={text => setEmail(text)}
            editable={true}
          />
        </View>
        <View style={styles.action}>
       
       <FontAwesome name="globe" color={colors.text} size={20} /><Text style={{fontSize: SMALL_FONT_SIZE, 
                     fontFamily: FONT_REGULAR,
                     marginLeft: 8,
                     paddingVertical:0}}>Contact person</Text>
     </View>
        <View style={styles.actionn}>
         
          <TextInput
            placeholder={contact}
            value={contact}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={text => setContact(text)}
            editable={true}
            
          />
        </View>
        <View style={styles.action}>
        <Icon name="map-marker-outline" color={colors.text} size={20} /><Text style={{fontSize: SMALL_FONT_SIZE, 
                     fontFamily: FONT_REGULAR,
                     marginLeft: 8,
                     paddingVertical:0}}>Location</Text>
     </View>
        <View style={styles.actionn}>
        
          <TextInput
            placeholder={address}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={text => setAddress(text)}
            editable={true}
            value={address}
          />
        </View>
        {utype=='User' && state.user.usertype!='Admin'?
        <View style={styles.action}>
       
       <FontAwesome name="user-o" color={colors.text} size={20} /><Text style={{fontSize: SMALL_FONT_SIZE, 
                     fontFamily: FONT_REGULAR,
                     marginLeft: 8,
                     paddingVertical:0}}>Select Admin</Text>
     </View>:null}
        {utype=='User' && state.user.usertype!='Admin'?<DropDownPicker
    items={mydata}
    defaultValue={'Select Admin'}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => setAdminId(item.value)}
/>:null}
        <TouchableOpacity style={styles.commandButton} onPress={() => {
        onUpdateProfile(userName,company,mobile,email,address,contact);
        }}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
    </ScrollView>
  );
};

export default AddProfileScreen;

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
   
    borderBottomWidth: 1,
    borderBottomColor: '#ff04',
    paddingTop:10,
    paddingBottom: 2,
    backgroundColor: 'lightgrey',
    alignItems:'center',justifyContent:'center'
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
  },
});