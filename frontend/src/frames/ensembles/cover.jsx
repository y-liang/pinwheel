
/**
 * home page
 */

import { Link, Outlet, useLoaderData } from 'react-router-dom';




export default function Cover() {

   return (
      <div>
         <h1>cover</h1>

         <Outlet />
      </div>
   );
}