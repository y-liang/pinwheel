
// const { BACKEND_URL } = process.env;
// const baseurl = BACKEND_URL;

// // called in auth-provider.jsx
// // response return error or token https://www.rfc-editor.org/rfc/rfc6749#section-5.1
// // request send token in header https://www.rfc-editor.org/rfc/rfc6749#section-4.1

// // 3 Protocol Endpoints
// // 4 Obtaining Authorization

// // 5 Issuing an Access Token

// // 6 Refreshing an Access Token

// // 7 Accessing Protected Resources

// // https://www.rfc-editor.org/rfc/rfc6749#section-7.1 Accessing Protected Resources
// // eg, the "bearer" token type is utilized by simply including the access token string in the request:
// //    GET /resource/1 HTTP/1.1
// //    Host: example.com
// //    Authorization: Bearer mF_9.B5f-4.1JqM


// // 
// // {
// //    "access_token":"2YotnFZFEjr1zCsicMWpAA",
// //    "token_type":"example",
// //    "expires_in":3600,
// //    "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
// //    "example_parameter":"example_value"
// //  }

// const authenticate = {
//    async verify(token) {
//       const url = `${baseurl}/account/verify`;
//       const response = await fetch(url, {
//          method: 'GET',
//          headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json;charset=UTF-8',
//          },
//       });



//       console.log('response!!!', response.headers.forEach(x => console.log(x)));
//       console.log('response!!!', response);


//       const data = await response.json();


//       console.log('data', data);
//       return data;
//    },


//    /* sign up */
//    async signup(fields) {
//       // fetch data
//       const url = `${baseurl}/account/signup`;

//       console.log('fields???', fields);

//       const response = await fetch(url, {
//          method: 'POST',
//          headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//          },
//          body: JSON.stringify(fields) // convert javascript object to json with stringify
//       });

//       console.log('response!!!', response.headers.get('Authorization'));
//       const token = JSON.parse(response.headers.get('Authorization')); //???
//       if (response.ok) {
//          return { token };
//       } else {
//          const { error } = await response.json(); // {error}
//          return { error };
//       }


//       // // handle error and response, send result, always return message not error, error is for internal diagnosis
//       // switch (response.status) {
//       //    case 422:
//       //       return { message: 'Unable to proceed at the moment. We are working on it. Try again later.' };
//       //    case 401:
//       //       return { message: data.error };
//       //    case 200:
//       //       // parse token before store
//       //       if (response.headers.has('Set-Token')) {
//       //          actStorage.set(JSON.parse(response.headers.get('Set-Token')));
//       //       }
//       //       return { message: data.message, redirect: data.redirect };

//       //    default:
//       //       return { message: 'Unavailable.' };
//       // }
//    },

//    /* log in */ // handle already logged in user in layout display
//    async login(fields) {
//       // fetch data
//       const url = `${baseurl}/account/login`;
//       const response = await fetch(url, {
//          method: 'POST',
//          headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//          },
//          body: JSON.stringify(fields) // convert javascript object to json with stringify
//       });

//       const data = await response.json();


//       // // handle error and response, send result, always return message not error, error is for internal diagnosis
//       // switch (response.status) {
//       //    case 422:
//       //       return { message: 'Unable to proceed at the moment. We are working on it. Try again later.' };
//       //    case 401:
//       //       return { message: data.error };
//       //    case 200:
//       //       // parse token before store
//       //       if (response.headers.has('Set-Token')) {
//       //          actStorage.set(JSON.parse(response.headers.get('Set-Token')));
//       //       }
//       //       return { message: data.message, redirect: data.redirect };

//       //    default:
//       //       return { message: 'Unavailable.' };
//       // }
//    },

//    /* log out */
//    async logout() {
//       let url = `${baseurl}/account/logout`;

//       const response = await fetch(url, {
//          method: 'POST',
//          headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//          },
//       });
//       const data = await response.json();

//       if (data.redirect) {
//          actStorage.remove();
//       }
//    },


//    /* forget password */
//    async forgetPassword(email) {
//       let url = `${baseurl}/account/forget`;
//       const response = await fetch(url, {
//          method: 'POST',
//          headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//          },
//          body: JSON.stringify({ email }) // convert javascript object to json with stringify
//       });
//       const data = await response.json();

//       // clear out bad token before handling further
//       if (response.headers.has('Clear-Token')) {
//          actStorage.remove();
//       }



//    },

//    /* reset password */ // only case for token in header
//    // check token before displaying reset password form
//    async resetPassword(token, password) {
//       // token from argument passed from query of link sent in email

//       // send new password along with token
//       let url = `${baseurl}/account/reset`;
//       const response = password ?
//          await fetch(url, {
//             method: 'POST',
//             headers: {
//                'Authorization': `Bearer ${token}`, // token from link
//                'Content-Type': 'application/json;charset=UTF-8',
//             },
//             body: JSON.stringify({ password }) // convert javascript object to json with stringify
//          }) :
//          await fetch(url, {
//             method: 'GET',
//             headers: {
//                'Authorization': `Bearer ${token}`,
//                'Content-Type': 'application/json;charset=UTF-8',
//             }
//          });
//       const data = await response.json();


//    },





//    /* deactivate account */
//    async deactivate(token, password) {
//       // token from argument passed from query of link sent in email

//       // send new password along with token
//       let url = `${baseurl}/account/deactivate`;
//       const response = await fetch(url, {
//          method: 'POST',
//          headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json;charset=UTF-8',
//          },
//          body: JSON.stringify({ password }) // convert javascript object to json with stringify
//       });
//       const data = await response.json();

//       // handle error and response, send result, always return message not error, error is for internal diagnosis
//       switch (response.status) {
//          case 422:
//             return { message: 'Unable to proceed at the moment. We are working on it. Try again later.' };
//          case 401:
//             return { message: data.error };
//          case 200: // deactivate, clear token
//             actStorage.remove();
//             return { message: data.message, redirect: data.redirect }; // redirect to homepage since profile setting page will vanish after deactivate

//          default:
//             return { message: 'Unavailable.' };
//       }
//    },



//    /* verify */
//    // async authenticate(token) {
//    //     if (!token) return;

//    //     let url = `${baseurl}/account/authenticate`;
//    //     const response = await fetch(url, {
//    //         method: 'GET',
//    //         headers: {
//    //             'Authorization': `Bearer ${token}`,
//    //             'Content-Type': 'application/json;charset=UTF-8',
//    //         },
//    //     });
//    //     const data = await response.json();

//    //     if (response.status == 200) {
//    //         return data; // {email} or {expired} or {invalid}
//    //     } else {
//    //         console.error(data.error); // status 400, bad request
//    //     }
//    // },


//    // -- delete

//    // -- update
// };


// export default authenticate;