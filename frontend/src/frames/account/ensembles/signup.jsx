
/**
 * sign up
 */

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../library/hooks/auth-use';
import validate from '../../../library/utils/validate';

export default function SignUp() {
   const navigate = useNavigate();
   const location = useLocation();
   const auth = useAuth(); // everything in auth context provider

   console.log('auth', auth);

   const from = location.state?.from?.pathname || "/";

   // error to display if any
   const [error, setError] = useState(null); // {email, password, combination}

   const handleSubmit = async (event) => {
      event.preventDefault();
      setError(null);

      const formData = new FormData(event.currentTarget); // await request.formData(); formData.get('title');
      const { email, password } = Object.fromEntries(formData);
      const formErrors = {
         email: validate.email(email)?.error || null,
         password: validate.password(password)?.error || null
      };

      // return errors if any, otherwise redirect
      if (Object.values(formErrors).some(val => val !== null)) {
         setError({ ...error, ...formErrors });
         return;
      }


      // useAuth - auth provider - authenticate -  signup
      const data = await auth.signup({ email, password });

      if (data?.error) {
         setError({ ...error, combination: data.error });
         return;
      }

      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      // navigate(from, { replace: true });
      return;
   };

   console.log('err???', error);

   const handleVerify = async () => {
      let data = await auth.verify();
      console.log('verify data', data);
   };


   return (
      <div>
         <p>You must sign up to view the page at {from}</p>
         <button onClick={handleVerify}>verify</button>

         <form onSubmit={handleSubmit}>
            <label>
               email: <input name="email" type="text" />
            </label>{" "}
            <span>{error?.email}</span>

            <label>
               password: <input name="password" type="text" />
            </label>{" "}
            <span>{error?.password}</span>



            <span>{error?.combination}</span>
            <button type="submit">Sign Up</button>
         </form>
      </div>
   );
}





// export async function loader() {
//    const profiles = await getProfiles();
//    return { profiles };
// }

// export async function action({ request }, callback) {
//    const formData = await request.formData(); // formData.get('title');
//    const { email, password } = Object.fromEntries(formData);
//    const errors = {
//       email: validate.email(email),
//       password: validate.password(password)
//    };

//    // return errors if any, otherwise redirect
//    if (Object.values(errors)) return errors;

//    await callback(); // useAuth signup
//    return redirect('/'); // useLocation

// }