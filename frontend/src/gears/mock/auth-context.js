
/**
 * AuthProvider
 * useAuth
 * 
 * used in
 * AuthStatus
 * RequireAuth
 */


import { createContext, useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import account from "../apis/account/account";
// import { mockAuthAPICall } from "./mock-api";




const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
   const [profile, setProfile] = useState(null);

   const signin = (newProfile, callback) => {
      return account.signin(() => {
         setProfile(newProfile);
         callback();
      });
   };

   const signout = (callback) => {
      return account.signout(() => {
         setProfile(null);
         callback();
      });
   };

   const value = { profile, signin, signout }; // profile is a string???

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
   return useContext(AuthContext);
}




