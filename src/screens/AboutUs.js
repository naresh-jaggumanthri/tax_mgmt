import React,{useState,useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Dimensions,
    Alert,Image, FlatList
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { Paragraph, useTheme } from 'react-native-paper';

import Animated from 'react-native-reanimated';
import { AuthContext } from '../components/context';

import Users from '../model/users';
import axios from 'axios';
import { FlatGrid } from 'react-native-super-grid';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import ImageModal from 'react-native-image-modal';
import Dialog, { DialogFooter,DialogTitle, DialogButton, DialogContent,ScaleAnimation } from 'react-native-popup-dialog';
const exampleImage = require('../assets/invoice22.jpg');
const exampleImage2 = require('../assets/tenor.gif');
import Config from 'react-native-config';
import { useAuth } from "../providers/auth";
import Loader from '../components/Loader';
import * as api from "../api/auth";
import {Searchbar} from 'react-native-paper';

const AboutUs = ({navigation}) => {
 
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
  
  const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();
   
    const [modalVisible, setModalVisible] =React.useState(false);
  const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;
  const exampleGIF = Image.resolveAssetSource(exampleImage2).uri;
  const [image, setImage] =React.useState(exampleImageUri);
  const [uploadStatus, setUploadStatus] =React.useState(false);
  const [itemId,setItemId]=React.useState(0);
  const {state, handleLogout} = useAuth();
  const [loading, setLoading] = useState(false);
    const [items, setItems] = React.useState([
      { id:1,name: 'UPLOAD INVOICE', code: '#3498db' },
      { id:2,name: 'UPLOAD BANK STATEMENT', code: '#f39c12' },
      { id:3,name: 'OTHER DOCUMENTS', code: '#e74c3c' },
     
      
    ]);
    const [mydata, setMydata] = useState([]);
    const [value, setValue] = useState('');
    const [isInitiated, setInitiated] = useState(true);
    const [msg,setMsg]=useState("WELCOME: \n Thank you for using the app. Here you can send your invoices, bank statements & other documents to your dedicated manager who will ensure your records are kept up to date.\nYou can use the methods below to contact us if you have any query.\nPlease do not forget to check the notifications for any updates.\nPlease ensure the pictures you upload are readable & clear.");

    
    bs = React.createRef();
    fall = new Animated.Value(1);
    const takePhotoFromCamera = () => {
      //Alert.alert('ok');
      ImagePicker.openCamera({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropping: true,
        compressImageQuality: 0.7
      }).then(image => {
        console.log(image);
        image.path.length>0?setModalVisible(true):setModalVisible(false);
        setImage(image.path);
        this.bs.current.snapTo(1);
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
        image.path.length>0?setModalVisible(true):setModalVisible(false);
        setImage(image.path);
        this.bs.current.snapTo(1);
      });
    }
    renderInner = () => (
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Upload Image</Text>
          <Text style={styles.panelSubtitle}>Choose Your Picture</Text>
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={()=>takePhotoFromCamera()}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={()=>choosePhotoFromLibrary()}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
       
        {/*<TouchableOpacity
          style={styles.panelButton}
          onPress={() => viewFullImage()}>
          <Text style={styles.panelButtonTitle}>View</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
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
    const onclickImage =(id) =>{
      setItemId(id);
      //Alert.alert('img');
      //setenableView(false);
      this.bs.current.snapTo(0);

      // alert(image);
 

    }

onUploadImage=async()=>{
 
  // alert(state.user.id);
   setLoading(true);
  if(itemId==1)
     {
      try {
      let response = await api.saveInvoice(state.user.id, image);
       //updateUser(response.user);
       if(response.status=="success")
       {
      console.log(JSON.stringify(response.message));
      setUploadStatus(true);
      setLoading(false);   
      }else{
        alert("Something went wrong");
        setLoading(false);
      }
      setLoading(false);
  
      //navigation.navigate('App');
  } catch (error) {
      //setError(error.message);
      setLoading(false)
  }
     }else if(itemId==2){
      try {
        //updateUser(response.user);
        setLoading(true);
        let response = await api.saveBankStatement(state.user.id, image);
      if(response.status=="success")
      {
     console.log(JSON.stringify(response.message));
     setUploadStatus(true);  
     setLoading(false); 
     }else{
      alert("Something went wrong");
      setLoading(false);
    }
     
 
     //navigation.navigate('App');
 } catch (error) {
     //setError(error.message);
     setLoading(false)
 }
     
     }else if(itemId==3) {
      try {
        //updateUser(response.user);
        setLoading(true);
        let response = await api.saveOtherDocument(state.user.id, image);
        if(response.status=="success")
        {
       console.log(JSON.stringify(response.message));
       setUploadStatus(true);  
       setLoading(false); 
       }else{
        alert("Something went wrong");
        setLoading(false);
      }
      //navigation.navigate('App');
 } catch (error) {
     //setError(error.message);
     setLoading(false)
 }
}
    
 
}

const updateMessageStatus = async(id)=>{
  setLoading(true);
  let res = await api.updateMessage(id,state.user.id);
  if (res && res.body != null) {
     
  //alert(JSON.stringify(res3.body));
  setMydata(res.body);
  setLoading(false);
  }else{
  alert('Something went wrong to retrieve other documents');
  setLoading(false);
}

  setLoading(false);
};

const makeRemoteRequest = async () => {
 

  
  setLoading(true);
 
 
  let res3 = await api.getMessages(state.user.id);
  if (res3 && res3.body != null) {
     
  //alert(JSON.stringify(res3.body));
  setMydata(res3.body);
  }else{
  alert('Something went wrong to retrieve other documents');
}

  setInitiated(false);
  setLoading(false);
};
const searchFilterFunction = (text) => {
  setValue(text);
  setInitiated(false);

  const newData = mydata.filter((item) => {
    const itemData = `${item.docname.toUpperCase()} ${
      item.created
    } ${item.key4.toUpperCase()}`;
    const textData = text.toUpperCase();

    return itemData.indexOf(textData) > -1;
  });

  // alert(text);
  if (text == null || text == '') {
    setInitiated(true);
  } else {
    setMydata(newData);
  }
};

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
      }}
    />
  );
};
const onChangeSearch = (query) => searchFilterFunction(query);
const renderHeaderList = () => {
  if (isInitiated) {
    makeRemoteRequest();
  }
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={value}
    />
  );
};

const itemOnclick = (id,msg) => {
  
 setMsg(msg);
  setModalVisible(true);
  updateMessageStatus(id);
};

    
    return (
      <View style={styles.container}>
       <BottomSheet
        ref={this.bs}
        snapPoints={[360, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 0,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}></Animated.View>
      
          <StatusBar backgroundColor='#F6F9F3' barStyle="light-content"/>
          <Dialog
          
          visible={modalVisible}
          dialogAnimation={new ScaleAnimation({
        initialValue: 0, // optional
        useNativeDriver: true, // optional
      })}
      dialogTitle={!uploadStatus?<DialogTitle title="" />:<DialogTitle title="Image Uploaded Successfully." />}
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                onPress={() => {
                  setModalVisible(false);
                  
                }}
              />
             
            </DialogFooter>
          }
        >
          <DialogContent>
         
          <Paragraph style={{textAlign:'justify',justifyContent:'center'}}>
           {msg}
           </Paragraph>
         
          </DialogContent>
        </Dialog>
          <View style={{flex:0.02,paddingHorizontal:30,paddingVertical:10}}>
          <View style={{alignItems:'flex-start',justifyContent:'flex-start'}}>
          <TouchableOpacity
                 onPress={()=>{
           navigation.navigate('HomeScreen');
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
          <View style={{flex:0.02,alignItems:'flex-end',justifyContent:'flex-end',paddingHorizontal:30,paddingVertical:10,marginTop:40}}>
          <TouchableOpacity
          onPress={()=>{
           //alert('ok');
           navigation.navigate('SignInScreen');
           handleLogout();
          }}>
             <Feather 
                        name="power"
                        color="red"
                        size={25}
                        style={{fontStyle:'bold'}}
                    />
                   
                </TouchableOpacity>

          </View>
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
            <Text style={styles.text_header}>Notifications !</Text>
        </View>
        
        <View style={styles.aboutus}>
        
        <Text style={styles.aboutus_header}>Message from Admin</Text>
       
          <ScrollView style={{height:110,marginBottom:1}}>
           <Paragraph style={{textAlign:'justify',justifyContent:'center'}}>
           {msg}
           </Paragraph>
           </ScrollView>
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
      <Loader loading={loading}></Loader>
     {/* <Dialog
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
          <ImageModal
            resizeMode="contain"
            imageBackgroundColor="#000000"
            style={{
              width: 310,
              height: 310,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={{
              uri: img,
            }}
          />
        </DialogContent>
      </Dialog> */}

      <FlatList
        data={mydata}
        renderItem={({item}) => (
          <ListItem bottomDivider>
        
            <ListItem.Content
              onTouchStart={() => {
                itemOnclick(item.id,item.msg);
              }} >
              <ListItem.Title> <Paragraph style={item.status=='Unread'?{textAlign:'justify',justifyContent:'center',paddingLeft: 0, color: 'grey'}:{textAlign:'justify',justifyContent:'center',paddingLeft: 10, color: 'blue'}}>{item.msg}</Paragraph></ListItem.Title>
              <ListItem.Subtitle>{item.createdat}</ListItem.Subtitle>
              
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        keyExtractor={(item) => item.created}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderHeaderList}></FlatList>
    </View>
      </View>
    );
};

export default AboutUs;
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
        fontSize: 20
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
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center'
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
    
  });