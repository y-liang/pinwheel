
/**
 * AuthProvider
 * useAuth
 * 
 * used in
 * AuthStatus
 * RequireAuth
 */


import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import authenticate from "../../../gears/account/authenticate";
import AuthContext from "../../../library/hooks/auth-context";

// import { mockAuthAPICall } from "./mock-api";


// ??? necessary
// if (typeof window !== 'undefined') { // Check if we're running in the browser.
//    // checkAuthToken();
//    // loadDataFromLocalStorage();
// }


const setAuthToken = (token) => {
   localStorage.setItem('auth-token', JSON.stringify(token));
};

// from local storage
const getAuthToken = () => {
   const token = JSON.parse(localStorage.getItem('auth-token'));
   console.log('token', token);
   return token;
};

const removeAuthToken = () => {
   localStorage.removeItem('auth-token');
};

// const verifyAuthToken = (token) => {

// }


// check auth - run it during module initialization and before the app renders
if (typeof window !== 'undefined') { // Check if we're running in the browser.
   // only runs once per app load
   const token = getAuthToken();

   // check token authenticity
   if (token) {
      const data = await authenticate.verify(token); // token sent via headers
      if (data?.error) {
         removeAuthToken();
      } // else keep the token in localStorage for useEffect when app renders for the first time
   }

}


export default function AuthProvider({ children }) {

   const authToken = getAuthToken() || null; // not sure if or null necessary
   var data = jwt.decode(authToken);  // jwt decode
   console.log('data', data); // what is the id for?


   // maybe setEmail?
   const [accountId, setAccountId] = useState(data?.accountId);

   // useEffect(() => {
   //    var { accountId } = jwt.decode(authToken);  // jwt decode
   //    setAccountId(accountId); // instead of using useEffect, 
   // }, [authToken]);

   /*
    * below functions only return if error
    */

   const verify = async () => {
      const data = await authenticate.verify();
      console.log('data verify', data);

      if (data.accountId) {
         setAccountId(data.accountId);
      }
      return data;
   };

   const signup = async (fields) => {
      const data = await authenticate.signup(fields);

      console.log('data', data);

      if (data.token) {

         setAccountId(data.accountId);
      }
      return data;
   };

   const login = async (fields) => {
      const data = await authenticate.login(fields);
      if (data.accountId) {
         setAccountId(data.accountId);
      }
      return data;
   };

   const logout = async () => {
      const data = await authenticate.logout();
      setAccountId(null);
   };



   const value = { accountId, verify, signup, login, logout }; // profile is a string???

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}





