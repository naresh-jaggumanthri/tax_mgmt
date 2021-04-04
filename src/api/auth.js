
//import axios from 'axios';
import * as c from './Const';
import CookieManager from 'react-native-cookies';
import AsyncStorage from '@react-native-community/async-storage';
// Intercept the request and set the global request as an ajax request
/*axios.interceptors.request.use((config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
       let regex = /.*csrftoken=([^;.]*).*$/; // Used to match csrftoken value from cookie
    config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1];
    return config
});*/
 //CookieManager.clearAll() //clearing cookies stored 

 const axios = require('axios').default;
  let cookie = null;
  
 const axiosObj = axios.create({
     baseURL: 'http://app.jaswalandco.com',
     headers: {
       'Content-Type': 'multipart/form-data',
       "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN"
     },
     responseType: 'json',
     withCredentials: true, // enable use of cookies outside web browser
   });

   // this will check if cookies are there for every request and send request
   axiosObj.interceptors.request.use(async config => {
     cookie = await AsyncStorage.getItem('cookie');
     if (cookie) {
       config.headers.Cookie = cookie;
     }
     const token = await AsyncStorage.getItem('token');
     if (token) {
     //config.headers.Authorization = token;
   }
     return config;
   });
 
 


 
//const cookieJar = new CookieJar();

const options = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
       //  jar: cookieJar,
        withCredentials: true,
        
       
         
       
    }
};

let token = new Date().getTime() + 3600 * 1000;
export async function register(data){
    try{
        
        let res = await axiosObj.post(c.REGISTER, data);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function login(username,password){
    //console.log(token);
   try{
       

        const form_data = new FormData();
        //for ( let key in data )
            form_data.append('username', username);
            form_data.append('password', password);

        let res = await axiosObj.post(`${c.LOGIN}`, form_data);
        console.log("login response====>",JSON.stringify(res));
        return res.data;
    }catch (e) {
        console.log(e.response);
        throw handler(e);

    }

}

export async function forgotPassword(data) {
    try {
       
        let res = await axiosObj.post(c.FORGOT_PASSWORD, data);

        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function updateProfile(id,username,company,mobileno,emailid,address,contact_person){
    try{
       

        const form_data = new FormData();
       // for ( let key in data )
            form_data.append('id',id);
            form_data.append('username',username);
            form_data.append('company',company);
            form_data.append('mobileno',mobileno);
            form_data.append('emailid',emailid);
            form_data.append('address',address);
            form_data.append('contact_person',contact_person);

           // console.log(JSON.stringify(form_data));

           

        let res = await axiosObj.post(`${c.UPDATE_PROFILE}`, form_data);
        console.log(JSON.stringify(res));
        if(res!=null)
        {
        return res.data;
        }else if(res.data==""){
            alert('something went wrong');

            return null;
        }
    }catch (e) {
       
        throw handler(e);
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}

export async function saveInvoice(id,data){

    

    let path=data.replace('file:///','');
   // alert(JSON.stringify(path));
    
    try{
        
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('doc', {
                uri: Platform.OS === 'android' ? `file:///${path}` : path,
                type: 'image/jpeg',
                name: 'image.jpg',
              });
           
 
         let res = await axiosObj.post(`${c.UPLOAD_INVOICE}`, form_data);
         console.log("save inv response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }
 export async function saveBankStatement(id,data){

    

    let path=data.replace('file:///','');
   // alert(JSON.stringify(path));
    
    try{
     
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('doc', {
                uri: Platform.OS === 'android' ? `file:///${path}` : path,
                type: 'image/jpeg',
                name: 'image.jpg',
              });
           
 
         let res = await axiosObj.post(`${c.UPLOAD_BANK}`, form_data);
         console.log("save inv response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }
 export async function saveOtherDocument(id,data){

    

    let path=data.replace('file:///','');
   // alert(JSON.stringify(path));
    
    try{
        
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('doc', {
                uri: Platform.OS === 'android' ? `file:///${path}` : path,
                type: 'image/jpeg',
                name: 'image.jpg',
              });
           
 
         let res = await axiosObj.post(`${c.UPLOAD_OTHER}`, form_data);
         console.log("save inv response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }

 export async function savePhoto(id,data){

    

    let path=data.replace('file:///','');
   // alert(JSON.stringify(path));
    
    try{
       
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('avatar', {
                uri: Platform.OS === 'android' ? `file:///${path}` : path,
                type: 'image/jpeg',
                name: 'image.jpg',
              });
           
 
         let res = await axiosObj.post(`${c.UPLOAD_IMAGE}`, form_data);
         console.log("save inv response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }

 export async function userInfo(id){
    
    try{
        
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             //form_data.append('password', password);
 
         let res = await axios.post(`${c.USER_INFO}`, form_data,options);
       
         console.log("user Info response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         //alert(e.message);
         throw handler(e);
     }
 
 }

 export async function getHistoryItem(id,type){
    
    try{
        
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('doc_type', type);
             //form_data.append('password', password);
 
         let res = await axiosObj.post(`${c.GET_HISTORY}`, form_data);
         console.log("history item response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }

 export async function getMessages(userid){
    try{
      
          const form_data = new FormData();
         //for ( let key in data )
             form_data.append('userid', userid);
             //form_data.append('doc_type', type);
             //form_data.append('password', password);
          let res = await axiosObj.post(`${c.GET_MESSAGES}`, form_data);
         console.log("message item response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }

 export async function updateMessage(id,userid){
    try{
       
          const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('userid', userid);
             //form_data.append('password', password);
          let res = await axiosObj.post(`${c.UPDATE_MESSAGES}`, form_data);
         console.log("update message item response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }
 

 