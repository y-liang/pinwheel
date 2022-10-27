
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
import { default as fetchToken } from "../../../library/apis/token-fetcher";



// only utilized within auth-provider, local storage
const storage = {
   setToken(token) {
      localStorage.setItem('auth-token', JSON.stringify(token));
   },
   getToken() {
      const tokenString = localStorage.getItem('auth-token');
      if (tokenString !== 'undefined') { // reconsider???
         const token = JSON.parse(tokenString);
         return token;
      }
   },
   removeToken() {
      localStorage.removeItem('auth-token');
   },
};


// run before render, check token - during module initialization and before the app renders
(async () => {
   if (typeof window !== 'undefined') { // Check if we're running in the browser.
      // only runs once per app load
      const token = storage.getToken();

      // verify token authenticity
      if (token) {
         const data = await fetchToken.egress('verify', token); //???

         if (data.error) {
            storage.removeToken();
         } // else keep the token in localStorage for useEffect when app renders for the first time
      }

   }
})();

export default function AuthProvider({ children }) {

   const token = storage.getToken();// not sure if or null necessary, if token exists it's been verified above

   var { accountId, email } = token ? jwt.decode(token) : {};  // jwt decode - { accountId, email, iat, exp }


   // not sure what to store in account - { accountId, email, profileId? }
   const [account, setAccount] = useState(token ? { accountId, email } : null);

   const access = async (type, fields) => {
      const data = await fetchToken.access(type, fields);
      // data - { alert, alert_description } or { access_token, token_type, expires_in } 

      if (!data.alert_description) {
         storage.setToken(data.access_token);

         const { accountId, email } = jwt.decode(data.access_token);
         setAccount({ accountId, email });

      } else {
         storage.removeToken();
         setAccount(null);
         return data; // for ui to display description if any
      }
   };


   const egress = async (type) => {
      const token = storage.getToken();
      const data = await fetchToken.egress(type, token);

      if (!data.alert_description) {
         if (!data.refresh_token) { // type == 'logout'
            storage.removeToken();
            setAccount(null);

         } else { // 'verify'
            storage.setToken(data.refresh_token);
            const { accountId, email } = jwt.decode(data.refresh_token);
            setAccount({ accountId, email });
         }

      } else {
         storage.removeToken();
         setAccount(null);
         return data; // for ui to display description if any, logout returns {}
      }

   };

   const value = { account, access, egress }; // profile is a string???

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

