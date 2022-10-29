
/**
 * layout for login, logout, signup
 */

import { Outlet } from "react-router-dom";
export default function Account() {


   return (
      <>
         <h1>account</h1>
         <div className="relative flex min-h-full justify-center md:px-12 lg:px-0">
            <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
               <Outlet />
            </div>
            {/* <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
               <img alt="" src="" width="1664" height="1866" decoding="async" data-nimg="future" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            </div> */}
         </div>

      </>
   );

}

