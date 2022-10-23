import express from 'express';
import jwt from 'jsonwebtoken';
import authenticate from '../../gears/authenticate.js';
import accountStatus from '../../library/middleware/accountStatus.js';
import tokenVerifier from '../../library/middleware/tokenVerifier.js';


const router = express.Router();
const { JWT_SECRET } = process.env;


/**
 * endpoint /token
 * 
 * post - access_type - signup | login | reset | deactivate | reactivate | forget
 * get - egress_type - logout | verify
 */

router.post('/', (req, res) => {
   const { access_type: type } = req.params;
   res.setHeader('Content-Type', 'application/json;charset=UTF-8');

   const { email, password = null } = req.body;

   let account;
   switch (type) {
      case 'signup':
      case 'login':
      case 'reset':
      case 'deactivate':
      case 'reactivate':

         if (!email || !password) {
            res.status(422).send({
               error: 'invalid_request',
               error_description: `Unprocessable. Incomplete request.`
            });
            return;
         }

         account = await authenticate[type]({ email, password });
         break;

      case 'forget':
         if (!email) {
            res.status(422).send({
               error: 'invalid_request',
               error_description: `Unprocessable. Incomplete request.`
            });
            return;
         }
         account = await authenticate.forget({ email });
         break;

      default:
         res.status(400).send({
            error: `invalid_access`,
            error_description: `Unsupported access type.`
         });
         return;
   }


   // unsuccessful
   if (account.description) {
      res.status(200).send({
         description: account.description
      });
      return;
   }

   /* successful, proceed following */
   const { id: accountId } = account;

   // log activity
   await authenticate.mark(type, accountId);


   // successful, but if `forget` - do no send token in response
   if (type == 'forget') {
      res.status(200).end();
      return; //unnecessary?
   }

   // successful, token
   const token = jwt.sign({
      accountId,
      email
   }, JWT_SECRET, { expiresIn: 60 * 60 });

   // if `signup` and `forget`, send email with token
   if (['signup', 'forget'].some(type)) {
      // ...
      // ...
   }



   // response for `signup`, `login`, `reset`
   res.status(200).send({
      access_token: token,
      token_type: type, // credentials, password, reset_credentials
      expires_in: 3600,
   });
   // return;
});


router.get('/', tokenVerifier(), (req, res) => {
   const { egress_type: type } = req.params;
   res.setHeader('Content-Type', 'application/json;charset=UTF-8');
   const { accountId, email } = req.token || {};
   if (!accountId || !email) {
      res.status(400).send({
         error: 'invalid_request',
         error_description: 'Invalid token.'
      });
      return;
   }

   // check if email, accountId exist and active
   // if not return error
   if (!authenticate.check(accountId)) {
      res.status(400).send({
         error: 'invalid_request',
         error_description: `An account with email ${email} does not exists.`
      });
      return;
   }


   switch (type) {
      // case 'logout':
      case 'verify':
         await authenticate[type](accountId, email); // unnecessary, already verified above
         break;

      default:
         res.status(400).send({
            error: 'invalid_request',
            error_description: `Unsupported egress type.`
         });
         return;
   }

   /* successful, proceed following */

   // log activity
   await authenticate.mark(type, accountId);

   // successful, but if `logout` - do no send token in response
   if (type == 'logout') {
      res.status(200).end();
      return; // unnecessary?
   }

   // successful, token
   const token = jwt.sign({
      accountId,
      profileId, // necessary?
      email
   }, JWT_SECRET, { expiresIn: 60 * 60 });

   // if `verify` - send refresh token
   res.status(200).send({
      refresh_token: token,
      token_type: type, // verify
      expires_in: 3600,
   });
   // return;
});








export default router;