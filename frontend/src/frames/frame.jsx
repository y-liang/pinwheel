/**
 * layout for all ensembles
 */

import { Outlet } from "react-router-dom";
import AuthStatus from "./share/auth/auth-status";

export default function Frame() {


   return (
      <div className="text-3xl font-bold">
         <AuthStatus />
         <h1>frame head</h1>
         <Outlet />
         <h1>frame foot</h1>
      </div>
   );
}
