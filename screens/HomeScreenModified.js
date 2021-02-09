import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,ScrollView,Image
 
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import ImageModal from 'react-native-image-modal';
const exampleImage = require('../assets/invoice22.jpg');
const HomeScreen = ({navigation}) => {
  // let murl=require('../assets/logo.png');
  const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;
  const [image, setImage] = useState(exampleImageUri);
  const [enableView,setenableView] =useState(false);
  const {colors} = useTheme();
  const [language,setlanguage] =useState('java');
  const [language2,setlanguage2] =useState('java');
  //setImage(murl);
 
  console.log('imgpat ==>',image);
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const takePhotoFromCamera = () => {
    //Alert.alert('ok');
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
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
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }
  
  const onclickImage =() =>{
    //Alert.alert('img');
    setenableView(false);
    this.bs.current.snapTo(0);
  }
  const onValChange=(value)=>{setlanguage(value)};
  const onValChange2=(value)=>{setlanguage2(value)};
  
  const viewFullImage =() =>{
   // this.bs.current.snapTo(1);
    
    
    setenableView(true);
   
  }
 
  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Invoice</Text>
        <Text style={styles.panelSubtitle}>Choose Your Invoice Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={()=>takePhotoFromCamera()}>
        <Text style={styles.panelButtonTitle}>Take Invoice Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={()=>choosePhotoFromLibrary()}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      {
        (image.length>0)?
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => viewFullImage()}>
        <Text style={styles.panelButtonTitle}>View</Text>
      </TouchableOpacity>:null}
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

 

  return (
 
 <ScrollView>
  <View style={styles.container}>
  <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
  ABC Company
  </Text>
   <BottomSheet
        ref={this.bs}
        snapPoints={[430, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>

        <View style={{alignItems:'flex-start'}}>
        <Text style={{marginTop: 1, fontSize: 18, fontWeight: 'bold'}}>
            Select Organization
          </Text>
        <Picker
  selectedValue={language}
  style={{height:50,width:350,
              marginTop: 5, fontSize: 22, fontWeight: 'bold',borderBottom: '#000'}}
  onValueChange={(itemValue, itemIndex) =>
    onValChange(itemValue)
  }>
  <Picker.Item label="Home Solutions" value="homesol" />
  <Picker.Item label="Windows Tech" value="wintech" />
</Picker>

<Text style={{marginTop: 1, fontSize: 18, fontWeight: 'bold'}}>
            Select Sub Organization
          </Text>
        <Picker
  selectedValue={language2}
  style={{height:50,width:350,
              marginTop: 5, fontSize: 22, fontWeight: 'bold',border: '#000'}}
  onValueChange={(itemValue, itemIndex) =>
    onValChange2(itemValue)
  }>
  <Picker.Item label="Dhamecha" value="sub java" />
  <Picker.Item label="Mahindra" value="sub js" />
</Picker>

<ImageModal
    resizeMode="contain"
    imageBackgroundColor="#000000"
    style={{
      width: 310,
      height: 310,
    }}
    source={{
      uri: image,
    }}
  />   
          
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Invoice Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Company Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
       
        <TouchableOpacity style={styles.commandButton} onPress={() =>{navigation.navigate('EditTransaction')}}>
          <Text style={styles.panelButtonTitle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
    </ScrollView>
  );
};

export default HomeScreen;
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
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
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
