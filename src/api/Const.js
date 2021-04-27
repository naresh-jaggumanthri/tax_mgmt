import React,{useEffect} from 'react';
import axios from 'axios';
import * as api from "./auth";
//export const API_URL='http://sravyabiotech.com';


export const API_URL='http://app.jaswalandco.com';



export const LOGIN = `${API_URL}/mobileuser/users/signin.php`;
export const UPDATE_PROFILE = `${API_URL}/mobileuser/users/update.php`;
export const UPLOAD_IMAGE = `${API_URL}/mobileuser/users/savePhoto.php`;

export const UPLOAD_INVOICE = `${API_URL}/mobileuser/users/saveInvoice.php`;
export const USER_INFO =`${API_URL}/mobileuser/users/getPhoto.php`;

export const UPLOAD_BANK = `${API_URL}/mobileuser/users/saveBankStatement.php`;
export const UPLOAD_OTHER = `${API_URL}/mobileuser/users/saveOtherDocument.php`;

export const GET_HISTORY = `${API_URL}/mobileuser/users/getDocument.php`;

export const GET_MESSAGES = `${API_URL}/mobileuser/users/getMessages.php`;  
export const UPDATE_MESSAGES = `${API_URL}/mobileuser/users/updateMessage.php`;

export const GET_ADMINS = `${API_URL}/mobileuser/users/getAdminusers.php`;

export const GET_USERS = `${API_URL}/mobileuser/users/getMobileusers.php`;
export const SAVE_ADMIN =`${API_URL}/mobileuser/users/saveAdminuser.php`;
export const SAVE_MOBILE =`${API_URL}/mobileuser/users/saveMobileuser.php`;

export const ALL_MSGS =`${API_URL}/mobileuser/users/getAllMessages.php`;

export const ADD_MSG =`${API_URL}/mobileuser/users/createMessage.php`;
export const UPDATE_MESSAGE_CONTENT = `${API_URL}/mobileuser/users/updateMessageContent.php`;




