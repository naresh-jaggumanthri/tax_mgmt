import React,{useState,useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TouchableHighlight, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Dimensions,
    Alert,
    Image,Linking,BackHandler
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Paragraph, useTheme,RadioButton } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import ImageModal from 'react-native-image-modal';
import Animated from 'react-native-reanimated';
import call from 'react-native-phone-call';
import SendSMS from 'react-native-sms';
import Dialog, { DialogFooter,DialogTitle, DialogButton, DialogContent,ScaleAnimation } from 'react-native-popup-dialog';
import SendWhatsapp from '../components/SendWhatsapp.js';
import RadioButtonRN from 'radio-buttons-react-native';
import { useAuth } from "../providers/auth";
import Loader from '../components/Loader';
import * as api from "../api/auth";
import { SafeAreaView } from 'react-native';
//import {useNavigationParam} from '@react-navigation/native';

const exampleImage = require('../assets/invoice22.jpg');
const exampleImage2 = require('../assets/tenor.gif');
 
const HomeScreenAdmin = ({navigation,route}) => {
  
 // const {navigation}=props;
  const {uname}=route.params;
  //alert(uname);
  const [usernm,setUsernm]=React.useState(uname);
  const [modalVisible, setModalVisible] =React.useState(false);
  const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;
  const exampleGIF = Image.resolveAssetSource(exampleImage2).uri;
    const [image, setImage] =React.useState(exampleImageUri);
    const [uploadStatus, setUploadStatus] =React.useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

   
    const { colors } = useTheme();
    const {state, handleLogout} = useAuth();
    const [items, setItems] = React.useState([
      { id:1,name: 'USERS', code: '#f39c12' },
      { id:2,name: 'ADD USER', code: '#16a085' },
      { id:3,name: 'MESSAGES', code: '#e74c3c' },
     
      
    ]);
    const rdata = [
      {
        label: 'View Messages'
       },
       {
        label: 'Add Message'
       }
      ];
      const [error, setError] = useState(null);
      const [cellNumber, setCellNumber] = useState('9876543210');
      const [whatsAppMessage, setWhatsAppMessage] = useState('test msg');
      const [selectDoc,setSelectDoc]=useState(false);
      const [doctype,setDoctype]=useState(1);


      useEffect(() => {
       
          checkInternet();
        
      
               
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          onLogoutPress
        );
        return () => backHandler.remove();
    
  }, []);


  const checkInternet=async()=>{
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if(!isConnected)
    {
        console.log('No Internet Connection Available');
        alert('No Internet Connection Available');
        
        return;
    }
  }


    const onLogoutPress=()=>{
      //handleLogout();
     // return;
     console.log('backkk');
     return true;
    }
    bs2 = React.createRef();
    fall2 = new Animated.Value(1);
    const takePhotoFromCamera = () => {
      //Alert.alert('ok');
      ImagePicker.openCamera({
       cropping:true,
       showCropGuidelines:true,
       showCropFrame:true,
        
        compressImageQuality: 0.7,
        cropperCircleOverlay: false,
            
            freeStyleCropEnabled: true,
            includeBase64: true
      }).then(image => {
        console.log(image);
        image.path.length>0?setModalVisible(true):setModalVisible(false);
        setImage(image.path);
        this.bs2.current.snapTo(1);
        
      });
    }
  
    const choosePhotoFromLibrary = () => {
      ImagePicker.openPicker({
        cropping:true,
       showCropGuidelines:true,
       showCropFrame:true,
        
        compressImageQuality: 0.7,
        cropperCircleOverlay: false,
            
            freeStyleCropEnabled: true,
            includeBase64: true
      }).then(image => {
        console.log(image);
        image.path.length>0?setModalVisible(true):setModalVisible(false);
        setImage(image.path);
        this.bs2.current.snapTo(1);
        
      });
    }
    const [checked, setChecked] = React.useState('');
    const [showMsgDialog, setMsgDialog] = React.useState(false);
    const [sendMsg, setSendMsg] = React.useState(false);
    const [iswhatsapp,setwhatsapp]=React.useState(false);
    
   
    renderInner = () => (
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Upload Image</Text>
          <Text style={styles.panelSubtitle}>Choose Your Invoice Picture</Text>
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={()=>takePhotoFromCamera()}>
          <Text style={styles.panelButtonTitle}>Take Invoice Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={()=>choosePhotoFromLibrary()}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
       
       {/* <TouchableOpacity
          style={styles.panelButton}
          onPress={() => viewFullImage()}>
          <Text style={styles.panelButtonTitle}>View</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs2.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
       
      </View>
    );
  
    renderHeader = () => (
      <View style={styles.header_upload}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    );
    const onclickImage =() =>{
      //Alert.alert('img');
      //setenableView(false);
      setSelectDoc(true);
      
    }
   const makeCall = (number) => {
      const args = {
          number: number, // String value with the number to call
          prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
      }
     call(args).catch(console.error);
 }

 const showhistory = () => {
   //alert('Development is in under progress.')
   navigation.navigate('BookmarkScreen');
   return;
 }
 const initiateSMS = () => {
// setMsgDialog(true);
//setSendMsg(true);
setCellNumber('9876543210');
setWhatsAppMessage('test msg'); 
sendWMsg();
};
const sendWMsg = () => {

 
  
  if (cellNumber.length != 10) {
    Alert.alert('Please Enter Correct WhatsApp Number');
    return;
  }
  // Here we are using 91 which is India Country Code.
  // You can change country code.
  let URL = 'whatsapp://send?text=' +  whatsAppMessage + '&phone=91' + cellNumber;

  Linking.openURL(URL)
    .then((data) => {
      console.log('WhatsApp Opened');
    })
    .catch(() => {
      Alert.alert('Make sure Whatsapp installed on your device');
    });
};



const  onSendMsg=(checked)=>{
 // alert(checked);
  if(checked=='first'){
 // alert(checked);
  this.bs2.current.snapTo(0);
  setChecked('none');
  setDoctype(1);
}
if(checked=='second')
{
  //alert(checked);
  this.bs2.current.snapTo(0);
  setChecked('none');
  setDoctype(2);
}
if(checked=='third')
{
  //alert(checked);
  this.bs2.current.snapTo(0);
  setChecked('none');
  setDoctype(3);
}else if(checked=='none'){
 //this.bs2.current.snapTo(1);
}
}

onUploadImage=async()=>{
 
 // alert(image);
  setLoading(true);

  if(doctype==1)
  {

  try {
    let response = await api.saveInvoice(state.user.id, image);
    //updateUser(response.user);
     if(response.status=="success")
     {
    console.log(JSON.stringify(response.message));
    setUploadStatus(true);   
  }
    setLoading(false);

    //navigation.navigate('App');
} catch (error) {
    setError(error.message);
    setLoading(false)
}
  }
  if(doctype==2)
  {

  try {
    let response = await api.saveBankStatement(state.user.id, image);
    //updateUser(response.user);
     if(response.status=="success")
     {
    console.log(JSON.stringify(response.message));
    setUploadStatus(true);   
  }
    setLoading(false);

    //navigation.navigate('App');
} catch (error) {
    setError(error.message);
    setLoading(false)
}
  }
  if(doctype==3)
  {

  try {
    let response = await api.saveOtherDocument(state.user.id, image);
    //updateUser(response.user);
     if(response.status=="success")
     {
    console.log(JSON.stringify(response.message));
    setUploadStatus(true);   
  }
    setLoading(false);

    //navigation.navigate('App');
} catch (error) {
    setError(error.message);
    setLoading(false)
}
  }
} 



const getUsersList=()=>{
  navigation.navigate('Userslist');
   return;
}



const addUser=()=>{
  navigation.navigate('AddProfile',{usertype:'User'});
}

const sendNotificattion=()=>{
  setModalVisible(true);
}




    return (
     
      <View style={styles.container}>
      <Loader loading={loading}/>
       <BottomSheet
        ref={this.bs2}
        snapPoints={[360, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall2}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 0,
        opacity: Animated.add(0.1, Animated.multiply(fall2, 1.0)),
    }}></Animated.View>
    
          <StatusBar backgroundColor='#F6F9F3' barStyle="light-content"/>
          
     
                  <View style={{flex:0.02,alignItems:'flex-end',justifyContent:'flex-end',paddingHorizontal:30,paddingVertical:10,marginTop:40}}>
          <TouchableOpacity
               style={{alignItems:'flex-end',justifyContent:'flex-end'}}
               onPress={()=>{
                 navigation.navigate('SignInScreen');
                handleLogout();
                //navigation.navigate('Auth');
           
          }}             
                >
                    
                    <Feather 
                        name="power"
                        color="red"
                        size={25}
                        style={{fontStyle:'bold'}}
                    />
                   
                </TouchableOpacity>

          </View>
          <View style={styles.header_logo}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>

          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome {usernm}!</Text>
        </View>

        
        <View style={styles.aboutus}>
        
        <Text style={styles.aboutus_header}>About Us</Text>
       
          <ScrollView style={{height:110,marginBottom:1}}>
           <Paragraph style={{textAlign:'justify',justifyContent:'center'}}>
           
            Thank you for using the app. Here you can send your invoices, bank statements & other documents to your dedicated manager who will ensure your records are kept up to date.You can use the methods below to contact us if you have any query.
            Please do not forget to check the notifications for any updates.
            Please ensure the pictures you upload are readable & clear.
           </Paragraph>
           </ScrollView>
        </View>

        <Dialog
        visible={modalVisible}
        dialogAnimation={
          new ScaleAnimation({
            initialValue: 0, // optional
            useNativeDriver: true, // optional
          })
        }
        onTouchOutside={() => {
          setModalVisible(false);
        }}>
        <DialogContent>
        <View style={{height:120,width:250}}>

<RadioButtonRN
data={rdata}
selectedBtn={(e) => {console.log(e);
console.log("Label====>",e.label);
if(e.label!=null)
{
if(e.label==="View Messages"){
  //setwhatsapp(false);
  setChecked('first');
  setModalVisible(false);
    navigation.navigate('Messages');
    
  return;
}else if(e.label==="Add Message"){
  //setwhatsapp(true);
  setChecked('second');
  setModalVisible(false);
  navigation.navigate('AddMessage');
  
  return;
}
}
else{
  setChecked('none');
  return;
}
}
}
icon={
  <Icon
    name="check-circle"
    size={25}
    color="#2c9dd1"
  />
}
/>
</View>
        </DialogContent>
      </Dialog>

        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
           
            
           <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        
        <TouchableOpacity style={[styles.itemContainer, { backgroundColor: item.code }]}
        onPress={()=>{
          if(item.id==1)
          {
            getUsersList();
          }else if(item.id==2){
            addUser();
          }else if(item.id==3){
            sendNotificattion();
          }
        }}>
          <Text style={styles.itemName}>{item.name}</Text>
          {/*<Text style={styles.itemCode}>{item.code}</Text>*/}
        </TouchableOpacity>
      )}
    />
           
            
        </Animatable.View>
      </View>
     
    );
};

export default HomeScreenAdmin;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.16;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#F6F9F3'
    },
    aboutus:{
     
      justifyContent: 'center',
     color:'red',
     paddingBottom:20,
     paddingStart:20,
     paddingEnd:20,
    
    },
    aboutus_header:{
       justifyContent: 'flex-start',
      marginBottom:10,
      fontSize:18,
      color:'red'
    },
    logo:{
      justifyContent:'center',
      alignContent:'center',
        width: height_logo,
        height: height_logo
    
    },
    header_logo: {
      flex:0.3,
      alignItems:'center',
      justifyContent: 'center',
        
    },
    header: {
      flex: 0.08,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 0
    },
    footer: {
        flex: 0.6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 2,
        paddingVertical: 2
    },
    text_header: {
        color: 'black',
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
    gridView: {
      marginTop: 5,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'center',
      alignItems:'center',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
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
   panelHeader: {
     alignItems: 'center',
   },
   header_upload: {
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
   centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
  });