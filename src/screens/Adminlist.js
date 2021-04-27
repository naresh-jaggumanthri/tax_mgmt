import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,BackHandler,TouchableOpacity,SafeAreaView
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import * as api from '../api/auth';
import Loader from '../components/Loader';
import {useAuth} from '../providers/auth';
import ImageModal from 'react-native-image-modal';
import {Searchbar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

import Dialog, {
  DialogFooter,
  DialogTitle,
  DialogButton,
  DialogContent,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const Adminlist = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [mydata, setMydata] = useState([]);
  const [value, setValue] = useState('');
  const [isInitiated, setInitiated] = useState(true);
  const [img, setImg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onLogoutPress
    );
    return () => backHandler.remove();

}, []);
const onLogoutPress=()=>{
 /* setTimeout(() => {
    Alert.alert(
        title,
        msg,
        [
            {
                text: 'Cancel',
                
                //style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {handleLogout()}
            },
        ],
        { cancelable: false },
    ); 
}, 300) */
setModalVisible(false);
navigation.pop();

};
  const makeRemoteRequest = async () => {
    let adminlistdata = [];

    const {state, handleLogout} = useAuth();
    setLoading(true);
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
   

    setMydata(adminlistdata);

    setInitiated(false);
    setLoading(false);
  };
  const searchFilterFunction = (text) => {
    setValue(text);
    setInitiated(false);

    const newData = mydata.filter((item) => {
      const itemData = `${item.username.toUpperCase()} ${
        item.mobile
      } ${item.emailid.toUpperCase()}`;
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
  const renderHeader = () => {
    if (isInitiated) {
      makeRemoteRequest();
    }
    return (
      <SafeAreaView>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{alignItems:'flex-start',justifyContent:'flex-start',padding:10}}>
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
     
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={value}
        style={{alignItems:'flex-end',justifyContent:'flex-end',width:365}}
      />
      
       </View>
       </SafeAreaView>
    );
  };

  const itemOnclick = (id,usertype) => {
    // var newString = image.split("/").pop();

    //var final_url='http://sravyabiotech.com/mobileuser/uploads/users/'+newString;
    //alert(final_url);
    let sid=id;

    console.log("id selected==>",sid);
    //setImg(image);
    //setModalVisible(true);
    navigation.navigate('EditAdminProfile',{id:sid,type:usertype});
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
   
      <Loader loading={loading}></Loader>
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
      </Dialog>

      <FlatList
        data={mydata}
        renderItem={({item}) => (
          <ListItem bottomDivider>
            <Avatar source={{uri: item.Path}} />
            <ListItem.Content
              onTouchStart={() => {
                itemOnclick(item.id,item.usertype);
              }}>
              <ListItem.Title>{item.username}</ListItem.Title>
              <ListItem.Subtitle>{item.mobileno}</ListItem.Subtitle>
              <Text style={{paddingLeft: 10, color: 'grey'}}>
                {item.emailid}
              </Text>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        keyExtractor={(item) => item.username}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderHeader}></FlatList>
    </View>
  );
};

export default Adminlist;