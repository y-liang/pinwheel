
/**
 * sign up
 */

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../library/hooks/auth-use';

export default function Access({ type }) {
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

      const formErrors = validateFields({ email, password });
      if (formErrors) {
         setError({ email: formErrors.email, password: formErrors.password });
         return;
      }

      // useAuth - auth provider - access
      const data = await auth.access(type, { email, password }); // successful if return null, otherwise return description

      if (data.description) {
         setError({ ...error, combination: data.description });
         return;
      }

      navigate(from, { replace: true });
   };

   console.log('err???', error);




   return (
      <div>
         <p>You must {type.toUpperCase()} to view the page at {from}</p>

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
            <button type="submit">{type.toUpperCase()}</button>
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

   let description; // null
   Object.entries(fields).forEach((key, value) => {
      if (typeof value !== 'string' || value.length < 3) {
         description = {
            ...description,
            [key]: `Sorry. Your ${key} must be between 6 and 30 characters long.`
         };
      } else if (!regexValid[key]) {
         description = {
            ...description,
            [key]: `Enter a valid ${key}.`
         };
      }
   });

   return description;
}

