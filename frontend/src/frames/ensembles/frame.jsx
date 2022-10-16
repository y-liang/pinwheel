/**
 * layout for all ensembles
 */

import { Outlet } from "react-router-dom";
import { AuthStatus } from "../../gears/mock/auth-context";

export default function Frame() {


   return (
      <>
         <AuthStatus />
         <h1>frame head</h1>
         <Outlet />
         <h1>frame foot</h1>
      </>
   );
}
