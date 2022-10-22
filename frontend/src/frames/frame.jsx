/**
 * layout for all ensembles
 */

import { Outlet } from "react-router-dom";
import AuthStatus from "./universal/auth/auth-status";

export default function Frame() {


   return (
      <div>
         <AuthStatus />
         <h1>frame head</h1>
         <Outlet />
         <h1>frame foot</h1>
      </div>
   );
}
