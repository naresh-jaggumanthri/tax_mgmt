import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Dimensions,
    Alert,Image
} from 'react-native';
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

const AboutUs = ({navigation}) => {

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

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
          /*  setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });*/
        } else {
          /*  setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            }); */
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
           /* setData({
                ...data,
                password: val,
                isValidPassword: true
            });*/
        } else {
           /* setData({
                ...data,
                password: val,
                isValidPassword: false
            }); */
        }
    }

    const updateSecureTextEntry = () => {
        /*setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });*/
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {

      /*  const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        } );*/

        if ( userName.length == 0 || password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

      /*  if ( foundUser.length == 0 ) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }*/
        goForAxios();
        
        navigation.navigate('Home');
        //signIn(foundUser);
    }

    const goForAxios = () => {
       /* this.setState({
            fromFetch: false,
            loading: true,

        })*/
        axios.get("http://192.168.43.74:8080/api/user")
            .then(response => {
                console.log('getting data from axios', response.data);
              /*  this.setState({
                    loading: false,
                    axiosData: response.data
                })*/
            })
            .catch(error => {
                console.log("caught==>",error);
            });
    }

    const [items, setItems] = React.useState([
      { id:1,name: 'UPLOAD INVOICE', code: '#3498db' },
      { id:2,name: 'UPLOAD BANK STATEMENT', code: '#f39c12' },
      { id:3,name: 'OTHER DOCUMENTS', code: '#e74c3c' },
     
      
    ]);
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
    const onclickImage =() =>{
      //Alert.alert('img');
      //setenableView(false);
      this.bs.current.snapTo(0);
    }
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
      
          <StatusBar backgroundColor='#FFF080' barStyle="light-content"/>
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
                  setUploadStatus(false);
                }}
              />
              {(!uploadStatus?<DialogButton
                text="UPLOAD"
                onPress={() => {
                 // setImage(exampleGIF);
                  setUploadStatus(true);
                }}
              />:<DialogButton/>)}
            </DialogFooter>
          }
        >
          <DialogContent>
          {(!uploadStatus?<ImageModal
          
          resizeMode="contain"
          imageBackgroundColor="#000000"
          style={{
            width: 310,
            height: 310,
            padding:10
          }}
          source={{
            uri: image,
          }}
        />: <Image 
              source={exampleImage2}  
              style={{width: 310, height:310 }} 
          />)}
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
          <View style={{alignItems:'flex-end',justifyContent:'flex-end',paddingVertical:0}}>
          <TouchableOpacity
          onPress={()=>{
           navigation.navigate('SignInScreen');
          }}
                    
                >
                    
                    <Feather 
                        name="power"
                        color="red"
                        size={23}
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
           Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
           </Paragraph>
           </ScrollView>
        </View>
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
          onclickImage();
          }else if(item.id==2)
          {
            onclickImage();
          }else if(item.id==3){
            onclickImage();
          }
        }}
        >
          <Text style={styles.itemName}>{item.name}</Text>
          {/*<Text style={styles.itemCode}>{item.code}</Text>*/}
        </TouchableOpacity>
      )}
    />
           
            
        </Animatable.View>
      </View>
    );
};

export default AboutUs;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.16;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#FFF080'
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