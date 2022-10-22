/** middleware, implementation per cartwheel */

// // if error, return; otherwise, null

// const validate = {
//    // username(username) {
//    //    if (typeof username !== "string" || username.length < 3) {
//    //       return `Usernames must be at least 3 characters long`;
//    //    }
//    // },

//    // // check if form error
//    // if (
//    //    typeof loginType !== "string" ||
//    //    typeof email !== "string" ||
//    //    typeof password !== "string" ||
//    //    typeof redirectTo !== "string"
//    // ) {
//    //    return badRequest({
//    //       formError: `Form not submitted correctly`,
//    //    });
//    // }


//    field(fields) {
//       Object.values(fields).forEach(element => {
//          if (typeof element !== 'string') {
//             return { error: `Form not submitted correctly` };
//          }
//       });
//    },

//    email(email) {
//       if (typeof email !== "string" || email.length < 3) {
//          return { error: `Emails must be at least 3 characters long` };
//       }
//    },

//    password(password) {
//       if (typeof password !== "string" || password.length < 6) {
//          return { error: `Passwords must be at least 6 characters long` };
//       }
//    },

//    url(url) {
//       console.log(url);
//       let urls = ["/reviews", "/"];
//       if (urls.includes(url)) {
//          return url;
//       }
//       return "/reviews";
//    },

// };