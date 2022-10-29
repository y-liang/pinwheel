
/**
 * sign up
 */

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../library/hooks/auth-use';

export default function Access({ type }) {
   const navigate = useNavigate();
   const location = useLocation();
   const auth = useAuth(); // { account, access, egress } - everything in auth context provider

   const from = location.state?.from?.pathname || "/";

   // error to display if any
   const [error, setError] = useState(null); // {email, password, combination}

   const handleSubmit = async (event) => {
      event.preventDefault();
      setError(null);

      const formData = new FormData(event.currentTarget); // await request.formData(); formData.get('title');
      const { email, password } = Object.fromEntries(formData);

      const formErrors = validateFields({ email, password });

      if (formErrors) {
         setError({ email: formErrors.email, password: formErrors.password });
         return;
      }

      // useAuth - auth provider - access
      const data = await auth.access(type, { email, password }); // successful if return null, otherwise return alertDescription

      // auth access only returns alertDescription as data
      if (data) {
         setError({ ...error, combination: data.alertDescription });
         return;
      }


      navigate(from, { replace: true });
   };



   return (
      <div>
         <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            <div className="flex flex-col">
               <a aria-label="Home" href="/">
                  {/* logo */}
               </a>
               <div className="mt-20">
                  <h2 className="text-lg font-semibold text-gray-900">Sign in to your account</h2>
                  <p className="mt-2 text-sm text-gray-700">
                     Don’t have an account?
                     <a className="font-medium text-blue-600 hover:underline" href="/account/signup"> Sign up </a>
                     instead.
                  </p>
               </div>
            </div>
            <form className="mt-10 grid grid-cols-1 gap-y-8"
               onSubmit={handleSubmit}>
               <div className="">
                  <label htmlFor="email" className="mb-3 block text-sm font-medium text-gray-700">Email address</label>
                  <input id="email" type="email" name="email" autoComplete="email" required="" className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm" />
                  <p>{error?.email}</p>
               </div>
               <div className="">
                  <label htmlFor="password" className="mb-3 block text-sm font-medium text-gray-700">Password</label>
                  <input id="password" type="password" name="password" autoComplete="current-password" required="" className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm" />
                  <p>{error?.password}</p>
               </div>
               <div>
                  <p>{error?.combination}</p>
                  <input className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full" type="submit"
                     value={type.toUpperCase()} />
               </div>
            </form>
         </div>


      </div>
   );
}




// only utilized here in access.jsx, fields - { email, password }
function validateFields(fields) {
   const regexValid = {
      // name: value => /^[a-z0-9]{6,18}$/.test(value),
      email: value => /^[a-z0-9-+.]+@[a-z0-9-.]+\.[a-z0-9]+$/.test(value),
      password: value => /^[^\s]{6,36}$/.test(value),
   };

   let alertDescription = {}; // can just declare, have to assign it as an object
   Object.entries(fields).forEach(([key, value]) => {
      if (typeof value !== 'string' || value.length < 3) {
         alertDescription[key] = `Sorry. Your ${key} must be between 6 and 30 characters long.`;
      } else if (!regexValid[key](value)) {
         alertDescription[key] = `Enter a valid ${key}.`;
      }
   });

   if (Object.keys(alertDescription).length !== 0) {
      return alertDescription;
   }
}

