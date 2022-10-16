
const { BACKEND_URL_DEV: BACKEND_URL } = process.env;

const account = {
   /* sign up */
   async signUp(fields) {
      // fetch data
      const url = `${BACKEND_URL}/account/signup`;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${auth.token}`
         },
         body: JSON.stringify(fields) // convert javascript object to json with stringify
      });
      const data = await response.json(); // {token, user, message} or {error}

      // clear out bad token before handling further
      if (response.headers.has('Clear-Token')) {
         actStorage.remove();
      }

      // handle error and response, send result, always return message not error, error is for internal diagnosis
      switch (response.status) {
         case 422:
            return { message: 'Unable to proceed at the moment. We are working on it. Try again later.' };
         case 401:
            return { message: data.error };
         case 200:
            // parse token before store
            if (response.headers.has('Set-Token')) {
               actStorage.set(JSON.parse(response.headers.get('Set-Token')));
            }
            return { message: data.message, redirect: data.redirect };

         default:
            return { message: 'Unavailable.' };
      }
   },

   /* log in */ // handle already logged in user in layout display
   async signIn(fields) {
      // fetch data
      const url = `${BACKEND_URL}/account/login`;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${auth.token}`
         },
         body: JSON.stringify(fields) // convert javascript object to json with stringify
      });

      const data = await response.json();

      // clear out bad token before handling further
      if (response.headers.has('Clear-Token')) {
         actStorage.remove();
      }

      // handle error and response, send result, always return message not error, error is for internal diagnosis
      switch (response.status) {
         case 422:
            return { message: 'Unable to proceed at the moment. We are working on it. Try again later.' };
         case 401:
            return { message: data.error };
         case 200:
            // parse token before store
            if (response.headers.has('Set-Token')) {
               actStorage.set(JSON.parse(response.headers.get('Set-Token')));
            }
            return { message: data.message, redirect: data.redirect };

         default:
            return { message: 'Unavailable.' };
      }
   },

   /* log out */
   async signOut() {
      let url = `${BACKEND_URL}/account/logout`;

      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${auth.token}`
         },
      });
      const data = await response.json();

      if (data.redirect) {
         actStorage.remove();
      }
   },


   /* forget password */
   async forgetPassword(email) {
      let url = `${BACKEND_URL}/account/forget`;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${auth.token}`
         },
         body: JSON.stringify({ email }) // convert javascript object to json with stringify
      });
      const data = await response.json();

      // clear out bad token before handling further
      if (response.headers.has('Clear-Token')) {
         actStorage.remove();
      }

      // handle error and response, send result, always return message not error, error is for internal diagnosis
      switch (true) {
         case response.status == 422:
            return { message: 'Unable to proceed at the moment. We are working on it. Try again later.' };
         case response.status >= 400 && response.status !== 422:
            return { message: data.error }; // could be email server error
         case response.status == 200: // forget and reset, no token in response
            return { message: data.message, redirect: data.redirect }; // either could be null
         case response.status > 200 && response.status < 400:
            return { message: data.message };
         default:
            return { message: 'Unavailable.' };
      }

   },

   /* reset password */ // only case for token in header
   // check token before displaying reset password form
   async resetPassword(token, password) {
      // token from argument passed from query of link sent in email

      // send new password along with token
      let url = `${BACKEND_URL}/account/reset`;
      const response = password ?
         await fetch(url, {
            method: 'POST',
            headers: {
               'content-type': 'application/json',
               'authorization': `bearer ${token}` // not auth.token, token from link
            },
            body: JSON.stringify({ password }) // convert javascript object to json with stringify
         }) :
         await fetch(url, {
            method: 'GET',
            headers: {
               'content-type': 'application/json',
               'authorization': `bearer ${token}` // not auth.token, token from link
            }
         });
      const data = await response.json();

      // clear out bad token before handling further
      if (response.headers.has('Clear-Token')) {
         actStorage.remove();
      }

      // handle error and response, send result, always return message not error, error is for internal diagnosis
      switch (response.status) {
         case 422:
            return { message: 'Unable to proceed at the moment. We are working on it. Try again later.' };
         case 401:
            return { message: data.error };
         case 200: // forget and reset, no token in response
            return { message: data.message, redirect: data.redirect };

         default:
            return { message: 'Unavailable.' };
      }
   },





   /* deactivate account */
   async deactivate(token, password) {
      // token from argument passed from query of link sent in email

      // send new password along with token
      let url = `${BACKEND_URL}/account/deactivate`;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${token}` // not auth.token, token from link
         },
         body: JSON.stringify({ password }) // convert javascript object to json with stringify
      });
      const data = await response.json();

      // handle error and response, send result, always return message not error, error is for internal diagnosis
      switch (response.status) {
         case 422:
            return { message: 'Unable to proceed at the moment. We are working on it. Try again later.' };
         case 401:
            return { message: data.error };
         case 200: // deactivate, clear token
            actStorage.remove();
            return { message: data.message, redirect: data.redirect }; // redirect to homepage since profile setting page will vanish after deactivate

         default:
            return { message: 'Unavailable.' };
      }
   },



   /* verify */
   // async authenticate(token) {
   //     if (!token) return;

   //     let url = `${BACKEND_URL}/account/authenticate`;
   //     const response = await fetch(url, {
   //         method: 'GET',
   //         headers: {
   //             'content-type': 'application/json',
   //             'authorization': `bearer ${token}`
   //         },
   //     });
   //     const data = await response.json();

   //     if (response.status == 200) {
   //         return data; // {email} or {expired} or {invalid}
   //     } else {
   //         console.error(data.error); // status 400, bad request
   //     }
   // },


   // -- delete

   // -- update
};


export default account;