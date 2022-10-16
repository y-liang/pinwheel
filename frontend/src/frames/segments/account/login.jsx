
/**
 * log in
 */

import { Link, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../gears/mock/auth-context';
import { getProfiles, updateProfile } from '../../../gears/mock/mock-data';


// export async function redirectIfUser() {
//    const profiles = await getProfiles();
//    return { profiles };
// }

// export async function action({ request }) {
//    return updateProfile(await request.formData());
// }

export default function LogIn() {
   // const { profiles } = useLoaderData();

   let navigate = useNavigate();
   let location = useLocation();
   let auth = useAuth();

   let from = location.state?.from?.pathname || "/";

   function handleSubmit(event) {
      event.preventDefault();

      let formData = new FormData(event.currentTarget);
      let username = formData.get("username");

      auth.signin(username, () => {
         // Send them back to the page they tried to visit when they were
         // redirected to the login page. Use { replace: true } so we don't create
         // another entry in the history stack for the login page.  This means that
         // when they get to the protected page and click the back button, they
         // won't end up back on the login page, which is also really nice for the
         // user experience.
         navigate(from, { replace: true });
      });
   }

   return (
      <div>
         <p>You must log in to view the page at {from}</p>

         <form onSubmit={handleSubmit}>
            <label>
               email: <input name="email" type="text" />
            </label>{" "}
            <label>
               password: <input name="password" type="text" />
            </label>{" "}
            <button type="submit">Log In</button>
         </form>
      </div>
   );
}

