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
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Userslist = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [mydata, setMydata] = useState([]);
  const [value, setValue] = useState('');
  const [isInitiated, setInitiated] = useState(true);
  const [img, setImg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [sid,setSid]=useState('');
  const [utype,setUtype]=useState('');
  
  const rdata = [
    {
      label: 'View Profile'
     },
     {
      label: 'View Documents'
     }
    ];
    const [checked, setChecked] = useState('');
    const {state, handleLogout} = useAuth();
    let isAdmin=state.user.usertype;
    const loginId=state.user.id;

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
    let ulistdata = [];
    let ures;

    
    setLoading(true);

  

    ures = await api.getUserList();
  //  }
    if (ures && ures.body != null) {
     /* let newFile = res.body.map((file) => {
        return {...file, key4: 'Invoice'};
      }); */
      let uFile = ures.body;
      
      console.log(JSON.stringify(uFile));
      ulistdata = uFile;
    } else if (ures.body == '') {
      setLoading(false);
      alert('Something went wrong');
    }
   
   // alert(JSON.stringify(adminlistdata));
   let finaldata=[];
   



    let res = await api.getAllMessages();
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
   
    adminlistdata.map((item)=>{
       ulistdata.map((uitem)=>{
         
      if(isAdmin=='Admin'){
        if(uitem.id==item.userid && uitem.adminId==loginId)
        {
         console.log(loginId)
         console.log(item.username);
         console.log(item.msg);
         finaldata.push({
             id:item.id,
             userid:item.userid,
             username:uitem.username,
             msg:item.msg,
             status:item.status
         });

        }
      }else{
        if(uitem.id==item.userid)
        {
         console.log(loginId)
         console.log(item.username);
         console.log(item.msg);
         finaldata.push({
             id:item.id,
             userid:item.userid,
             username:uitem.username,
             msg:item.msg,
             status:item.status
         });

        }
      }
        
        

       });
      
    
  });




    setMydata(finaldata);

    setInitiated(false);
    setLoading(false);
  };
  const searchFilterFunction = (text) => {
    setValue(text);
    setInitiated(false);

    const newData = mydata.filter((item) => {
      const itemData = `${item.username.toUpperCase()} ${
        item.mobile
      } ${item.username.toUpperCase()}`;
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

  const itemOnclick = (id,smsg,smsgid) => {
    // var newString = image.split("/").pop();

    //var final_url='http://sravyabiotech.com/mobileuser/uploads/users/'+newString;
    //alert(final_url);
    let sid=id;
    
    console.log("id selected==>",sid);
    //setImg(image);
    navigation.navigate('UpdateMessage',{id:sid,msg:smsg,msgid:smsgid});
    //setUtype(usertype);
    setSid(id);
    //setModalVisible(true);

    
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
        <View style={{height:120,width:250}}>

<RadioButtonRN
data={rdata}
selectedBtn={(e) => {console.log(e);
console.log("Label====>",e.label);
if(e.label!=null)
{
if(e.label==="View Profile"){
  //setwhatsapp(false);
  setChecked('first');
  setModalVisible(false);
    navigation.navigate('EditAdminProfile',{id:sid,type:utype});
    
  return;
}else if(e.label==="View Documents"){
  //setwhatsapp(true);
  setChecked('second');
  setModalVisible(false);
  navigation.navigate('BookmarkScreen',{id:sid});
  
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

      <FlatList
        data={mydata}
        renderItem={({item}) => (
          <ListItem bottomDivider>
            
            <ListItem.Content
              onTouchStart={() => {
                itemOnclick(item.userid,item.msg,item.id);
              }}>
              <ListItem.Title>{item.username}</ListItem.Title>
              <ListItem.Subtitle>{item.msg}</ListItem.Subtitle>
              <Text style={{paddingLeft: 10, color: 'grey'}}>
                {item.status}
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

export default Userslist;
