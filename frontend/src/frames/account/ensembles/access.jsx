
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
         <p>You must {type.toUpperCase()} to view the page at {from}</p>

         <form onSubmit={handleSubmit}>
            <label>
               email: <input name="email" type="text" />
            </label>{" "}
            <p>{error?.email}</p>

            <label>
               password: <input name="password" type="text" />
            </label>{" "}
            <p>{error?.password}</p>


            <p>{error?.combination}</p>
            {/* <button type="submit"></button> */}
            <input type="submit" value={type.toUpperCase()} />
         </form>
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

