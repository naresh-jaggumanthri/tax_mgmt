import React, {useMemo, useReducer, useContext} from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import  {AsyncStorage}  from 'react-native';
import axios from "axios";

//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, {initialState, LOGGED_IN, LOGGED_OUT} from "../reducer";

// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const keys = [TOKEN_KEY, USER_KEY];

// CONTEXT ===================================
const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    // Get Auth state
    const getAuthState = async () => {
        try {
            //GET TOKEN && USER
            let token = await AsyncStorage.getItem(TOKEN_KEY);
            let user = await AsyncStorage.getItem(USER_KEY);
            user = JSON.parse(user);
            
            if (token !== null && user!== null) await handleLogin({token, user});
            else await handleLogout();

            return {token, user};
        } catch (error) {
            throw new Error(error)
        }
    };

    // Handle Login
    const handleLogin = async (data) => {
      
        try{
            //STORE DATA
            let user = data.body[0];
            let token =String('abc123');
           
           // let data_store = [[USER_KEY, JSON.stringify(user)], [TOKEN_KEY, token]];
            let data_store = JSON.stringify(user);
           // let mytoken=data.body[0].emailid;
           //await AsyncStorage.multiSet(data_store);
            await AsyncStorage.setItem('session',token);
            console.log("inside auth",AsyncStorage.getItem('session'));

           

            //AXIOS AUTHORIZATION HEADER
           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            //DISPATCH TO REDUCER
            dispatch({type: LOGGED_IN, user});
        }catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try{

            //REMOVE DATA
            //await AsyncStorage.multiRemove(keys);
            await AsyncStorage.removeItem('session');

            //AXIOS AUTHORIZATION HEADER
            delete axios.defaults.headers.common["Authorization"];

            //DISPATCH TO REDUCER
            dispatch({type: LOGGED_OUT});
        }catch (error) {
            throw new Error(error);
        }
    };

    //UPDATE USER LOCAL STORAGE DATA AND DISPATCH TO REDUCER
    const updateUser = async (user) => {
        try {
            await AsyncStorage.setItem('session',token);
            dispatch({type: LOGGED_IN, user}); //DISPATCH TO REDUCER
        } catch (error) {
            throw new Error(error);
        }
    };

    const value = useMemo(() => {
        return {state, getAuthState, handleLogin, handleLogout, updateUser};
    }, [state]);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth }
export default AuthProvider;