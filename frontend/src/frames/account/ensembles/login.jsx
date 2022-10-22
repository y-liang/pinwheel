
/**
 * log in
 */

import { useState } from 'react';
import { json, Link, Outlet, useActionData, useLoaderData, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import authenticate from '../../../gears/account/authenticate';



// export async function redirectIfaccount() {
//    const profiles = await getProfiles();
//    return { profiles };
// }

// export async function action({ request }) {
//    return updateProfile(await request.formData());
// }


/* loader */


/* driver */


export default function LogIn() {
   // const { profiles } = useLoaderData();

   /** previously
   let navigate = useNavigate();
   let location = useLocation();
   let auth = useAuth();

   let from = location.state?.from?.pathname || "/";

   function handleSubmit(event) {
      event.preventDefault();

      let formData = new FormData(event.currentTarget);
      let email = formData.get("email");

      auth.signin(email, () => {
         // Send them back to the page they tried to visit when they were
         // redirected to the login page. Use { replace: true } so we don't create
         // another entry in the history stack for the login page.  This means that
         // when they get to the protected page and click the back button, they
         // won't end up back on the login page, which is also really nice for the
         // account experience.
         navigate(from, { replace: true });
      });
   }
   */

   const [searchParams] = useSearchParams(); // get 'redirect' location or use navigate from



   function handleSubmit() {

   }

   // action data shape
   // {
   //    formError?;
   //    fieldErrors?: {
   //       email;
   //       password;
   //    };
   //    fields: {
   //       loginType;
   //       email;
   //       password;
   //    };
   // };

   // before sending data to server
   const badRequest = (actionData) => {
      json(actionData, { status: 400 });
   };

   // form data, request
   const [actionData, setActionData] = useState(); // request.formData()???

   // handle submit will run this function
   const action = async ({ request }) => {
      /*
      const form = await request.formData(); // check if bc of method on form?
      const loginType = form.get("loginType");
      const email = form.get("email");
      const password = form.get("password");
      */

      // replace above with this line
      const data = Object.fromEntries(await request.formData());
      setActionData(data); // necessary???
      const { loginType, email, password, redirectTo } = data;

      // const redirectTo = validateUrl(
      //    form.get("redirectTo") || "/reviews"
      // );

      // // check if form error
      // if (
      //    typeof loginType !== "string" ||
      //    typeof email !== "string" ||
      //    typeof password !== "string" ||
      //    typeof redirectTo !== "string"
      // ) {
      //    return badRequest({
      //       formError: `Form not submitted correctly`,
      //    });
      // }

      // // check if fields error
      // const fields = { loginType, email, password };
      // const fieldErrors = {
      //    email: validate.email(email),
      //    password: validate.password(password),
      // };

      // if (Object.values(fieldErrors).some(val => val !== null)) {
      //    return badRequest({ fieldErrors, fields });
      // } // double check this - Object.values(fieldErrors).some(val => val !== null)

      // // main functions


   };


   // export function CatchBoundary() {
   //    const caught = useCatch();

   //    if (caught.status === 401) {
   //       return (
   //          <div className="error-container">
   //             <p>You must be logged in to create a joke.</p>
   //             <Link to="/login">Login</Link>
   //          </div>
   //       );
   //    }
   // }


   return (
      // <div>
      //    <p>You must log in to view the page at {from}</p>
      //    <form onSubmit={handleSubmit}>
      //       <label>
      //          email: <input name="email" type="text" />
      //       </label>{" "}
      //       <label>
      //          password: <input name="password" type="text" />
      //       </label>{" "}
      //       <button type="submit">Log In</button>
      //    </form>
      // </div>

      <div className="container">
         <div className="content">
            <h1>Login</h1>
            <form method="post">
               {/* <input
                  type="hidden"
                  name="redirectTo"
                  value={
                     searchParams.get("redirectTo") ?? undefined
                  }
               /> */}
               <fieldset>
                  <legend>
                     Sign In or Sign Up?
                  </legend>
                  <label>
                     <input
                        type="radio"
                        name="loginType"
                        value="signin"
                        // defaultChecked ???
                        defaultChecked={
                           !actionData?.fields?.loginType ||
                           actionData?.fields?.loginType === "signin"
                        }
                     />{" "}
                     Sign In
                  </label>
                  <label>
                     <input
                        type="radio"
                        name="loginType"
                        value="signup"
                        defaultChecked={
                           actionData?.fields?.loginType ===
                           "signup"
                        }
                     />{" "}
                     Create Account / Sign Up
                  </label>
               </fieldset>


               <div>
                  <label htmlFor="email-input">email</label>
                  <input
                     type="text"
                     name="email"
                     id="email-input"

                     defaultValue={actionData?.fields?.email}
                     aria-invalid={actionData?.fieldErrors?.email ? true : false}
                     aria-errormessage={
                        actionData?.fieldErrors?.email
                           ? "email-error"
                           : undefined
                     }
                  />

                  {actionData?.fieldErrors?.email ? (
                     <p
                        className="form-validation-error"
                        role="alert"
                        id="email-error"
                     >
                        {actionData.fieldErrors.email}
                     </p>
                  ) : null}
               </div>


               <div>
                  <label htmlFor="password-input">Password</label>
                  <input
                     type="password"
                     name="password"
                     id="password-input"

                     defaultValue={actionData?.fields?.password}
                     aria-invalid={actionData?.fieldErrors?.password ? true : false}
                     aria-errormessage={
                        actionData?.fieldErrors?.password
                           ? "password-error"
                           : undefined
                     }
                  />

                  {actionData?.fieldErrors?.password ? (
                     <p
                        className="form-validation-error"
                        role="alert"
                        id="password-error"
                     >
                        {actionData.fieldErrors.password}
                     </p>
                  ) : null}
               </div>


               <div>
                  {actionData?.formError ? (
                     <p
                        className="form-validation-error"
                        role="alert"
                     >
                        {actionData.formError}
                     </p>
                  ) : null}
               </div>


               <button type="submit" className="button">
                  Submit
               </button>
            </form>
         </div>
         {/* <div className="links">
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/reviews">Reviews</Link>
               </li>
            </ul>
         </div> */}
      </div>
   );
}

