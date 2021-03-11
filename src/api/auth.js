import axios from 'axios';

import * as c from './Const';

export async function register(data){
    try{
        let res = await axios.post(c.REGISTER, data);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function login(username,password){
    
   try{
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        const form_data = new FormData();
        //for ( let key in data )
            form_data.append('username', username);
            form_data.append('password', password);

        let res = await axios.post(`${c.LOGIN}`, form_data, options);
        console.log("login response====>",JSON.stringify(res));
        return res.data;
    }catch (e) {
        throw handler(e);
    }

}

export async function forgotPassword(data) {
    try {
        let res = await axios.post(c.FORGOT_PASSWORD, data);

        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function updateProfile(id,username,company,mobileno,emailid,address,contact_person){
    try{
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

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

           

        let res = await axios.post(`${c.UPDATE_PROFILE}`, form_data, options);
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
         const options = {
             headers: {
                 Accept: "application/json",
                 "Content-Type": "multipart/form-data"
             }
         };
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('doc', {
                uri: Platform.OS === 'android' ? `file:///${path}` : path,
                type: 'image/jpeg',
                name: 'image.jpg',
              });
           
 
         let res = await axios.post(`${c.UPLOAD_INVOICE}`, form_data, options);
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
         const options = {
             headers: {
                 Accept: "application/json",
                 "Content-Type": "multipart/form-data"
             }
         };
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('doc', {
                uri: Platform.OS === 'android' ? `file:///${path}` : path,
                type: 'image/jpeg',
                name: 'image.jpg',
              });
           
 
         let res = await axios.post(`${c.UPLOAD_BANK}`, form_data, options);
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
         const options = {
             headers: {
                 Accept: "application/json",
                 "Content-Type": "multipart/form-data"
             }
         };
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('doc', {
                uri: Platform.OS === 'android' ? `file:///${path}` : path,
                type: 'image/jpeg',
                name: 'image.jpg',
              });
           
 
         let res = await axios.post(`${c.UPLOAD_OTHER}`, form_data, options);
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
         const options = {
             headers: {
                 Accept: "application/json",
                 "Content-Type": "multipart/form-data"
             }
         };
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('avatar', {
                uri: Platform.OS === 'android' ? `file:///${path}` : path,
                type: 'image/jpeg',
                name: 'image.jpg',
              });
           
 
         let res = await axios.post(`${c.UPLOAD_IMAGE}`, form_data, options);
         console.log("save inv response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }

 export async function userInfo(id){
    
    try{
         const options = {
             headers: {
                 Accept: "application/json",
                 "Content-Type": "multipart/form-data"
             }
         };
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             //form_data.append('password', password);
 
         let res = await axios.post(`${c.USER_INFO}`, form_data, options);
       
         console.log("user Info response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }

 export async function getHistoryItem(id,type){
    
    try{
         const options = {
             headers: {
                 Accept: "application/json",
                 "Content-Type": "multipart/form-data"
             }
         };
 
         const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('doc_type', type);
             //form_data.append('password', password);
 
         let res = await axios.post(`${c.GET_HISTORY}`, form_data, options);
         console.log("history item response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }

 export async function getMessages(userid){
    try{
         const options = {
             headers: {
                 Accept: "application/json",
                 "Content-Type": "multipart/form-data"
             }
         };
          const form_data = new FormData();
         //for ( let key in data )
             form_data.append('userid', userid);
             //form_data.append('doc_type', type);
             //form_data.append('password', password);
          let res = await axios.post(`${c.GET_MESSAGES}`, form_data, options);
         console.log("message item response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }

 export async function updateMessage(id,userid){
    try{
         const options = {
             headers: {
                 Accept: "application/json",
                 "Content-Type": "multipart/form-data"
             }
         };
          const form_data = new FormData();
         //for ( let key in data )
             form_data.append('id', id);
             form_data.append('userid', userid);
             //form_data.append('password', password);
          let res = await axios.post(`${c.UPDATE_MESSAGES}`, form_data, options);
         console.log("update message item response====>",JSON.stringify(res));
         return res.data;
     }catch (e) {
         throw handler(e);
     }
 
 }
 

 