
/**
 * AuthProvider
 * useAuth
 * 
 * utilized in
 * AuthStatus
 * RequireAuth
 */


import { useState } from "react";
import jwt from 'jsonwebtoken';
import AuthContext from "../../../library/hooks/auth-context";
import { tokenEgress, tokenAccess } from "../../../gears/account/token";


// run before render, check token - during module initialization and before the app renders
if (typeof window !== 'undefined') { // Check if we're running in the browser.
   // only runs once per app load
   const token = storage.getToken();

   // verify token authenticity
   if (token) {
      const data = await tokenEgress('verify', token); // token sent via headers
      if (data.description) {
         storage.removeToken();
      } // else keep the token in localStorage for useEffect when app renders for the first time
   }

}

export default function AuthProvider({ children }) {

   const token = storage.getToken() || null; // not sure if or null necessary, if token exists it's been verified above
   var accountData = token ? jwt.decode(token) : null;  // jwt decode - { accountId, email }
   console.log('accountData', accountData); // what is the id for?


   // not sure what to store in account - { accountId, email, profileId? }
   const [account, setAccount] = useState(accountData);

   const access = async (type, fields) => {
      const data = await tokenAccess(type, fields);
      // data - { description } or { access_token, token_type, expires_in } 

      if (!data.description) {
         storage.setToken(data.access_token);

         const { accountId, email } = data.access_token;
         setAccount({ accountId, email });

      } else {
         storage.removeToken();
         return data; // for ui to display description if any
      }
   };


   const egress = async (type) => {
      const token = storage.getToken();
      const data = await tokenEgress(type, token);

      if (!data.description) {
         if (!data.refresh_token) { // type == 'logout'
            storage.removeToken();
         } else { // 'verify'
            storage.setToken(data.refresh_token);

            const { accountId, email } = data.refresh_token;
            setAccount({ accountId, email });
         }

      } else {
         storage.removeToken();
         return data; // for ui to display description if any
      }

   };


   const value = { account, access, egress }; // profile is a string???

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


// only utilized within auth-provider, local storage
const storage = {
   setToken(token) {
      localStorage.setItem('auth-token', JSON.stringify(token));
   },
   getToken() {
      const token = JSON.parse(localStorage.getItem('auth-token'));
      console.log('token', token);
      return token;
   },
   removeToken() {
      localStorage.removeItem('auth-token');
   },
};
