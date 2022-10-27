// has a middleware called authenticate
// header should contain login token if logged in
// every time a user trying to do something that only logged in user allow to do
// needs to authenticate it is the user
// middleware understands req.path, but not req.params

import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;


/**
 * verify token and email
 * and set req email for later use
 * 
 * to exit middleware early, return next(); 
 * 
 * if no next(), it will not proceed back to the route handler
 */

export default async function tokenVerifier(req, res, next) {
   req.token = {}; // instantiate for holding token status - notfound, expired, invalid | email, accountId

   // if (!req.headers['authorization']) {
   //    req.token.notfound = true;
   //    return next();
   // }

   const token = req.headers['authorization']?.split(' ')[1]; // or null string

   // not sure? if null value
   if (token == 'null') {
      req.token.description = 'notfound';
      return next(); // exit this middleware early, must have return to exit out of this middleware
   }

   try {
      const decoded = jwt.verify(token, JWT_SECRET); // console.log('decoded email', decoded.email); // email
      req.token.email = decoded.email; // in database this email could be nonexistent or deactivated or active 
      req.token.accountId = decoded.accountId;

      next();
   } catch (error) {
      // expired or not matched
      if (error.expiredAt) {
         req.token.description = 'expired';
      } else {
         req.token.description = 'invalid';
      }
      next();
   }


};






// storage of token
// https://auth0.com/docs/secure/security-guidance/data-security/token-storage#browser-in-memory-scenarios


// https://jwt.io/introduction
// scenarios where JSON Web Tokens are useful:
// - authorization: once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token
// - information exchange: JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with

// JSON Web Token structure, header.payload.signature
// whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the authorization header using the bearer schema. The content of the header should look like the following:
// authorization: bearer <token>

// benefits:
// - this can be, in certain cases, a stateless authorization mechanism. 
// - the server's protected routes will check for a valid JWT in the authorization header, and if it's present, the user will be allowed to access protected resources. 
// - if the JWT contains the necessary data, the need to query the database for certain operations may be reduced, though this may not always be the case.