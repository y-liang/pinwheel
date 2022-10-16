/**
 * display profile detail
 */

import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { getDetails, updateDetail } from '../../gears/mock/mock-data';


export async function loader() {
   const details = await getDetails();
   return { details };
}

export async function action({ request }) {
   return updateDetail(await request.formData());
}

export default function Detail() {
   const { details } = useLoaderData();

   return (
      <div>
         <h1>detail</h1>
         {details[0].street + details[0].city}
         <Outlet />
      </div>
   );
}