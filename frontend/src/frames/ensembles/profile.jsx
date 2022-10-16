
/**
 * display all profiles
 */

import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { getProfiles, updateProfile } from '../../gears/mock/mock-data';


export async function loader() {
   const profiles = await getProfiles();
   return { profiles };
}

export async function action({ request }) {
   return updateProfile(await request.formData());
}

export default function Profile() {
   const { profiles } = useLoaderData();

   return (
      <div>
         <h1>profile</h1>
         <nav>
            {profiles.length ? (
               <ul>
                  {profiles.map((profile, index) => (
                     <li key={index}>
                        <Link to={`details/${index}`}>
                           {profile.first || profile.last ? (
                              <>
                                 {profile.first} {profile.last}
                              </>
                           ) : (
                              <i>No Name</i>
                           )}{" "}
                           {profile.favorite && <span>★</span>}
                        </Link>
                     </li>
                  ))}
               </ul>
            ) : (
               <p>
                  <i>No profiles</i>
               </p>
            )}
         </nav>
         <div id="detail">
            <Outlet />
         </div>
      </div>
   );
}