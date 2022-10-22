import express from 'express';
import jwt from 'jsonwebtoken';
import authenticate from '../../gears/authenticate.js';
import tokenVerifier from '../../library/middleware/tokenVerifier.js';


const router = express.Router();
const { JWT_SECRET } = process.env;

// endpoint /token
// asked for token, to send token

router.post('/', (req, res) => {
   const { access_type: type } = req.params;
   res.setHeader('Content-Type', 'application/json;charset=UTF-8');

   const { email, password = null } = req.body;

   let account;
   switch (type) {
      case 'signup':
      case 'login':
      case 'reset':
         account = await authenticate[type]({ email, password });
         break;

      case 'forget':
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

   // successful, token
   const token = jwt.sign({
      accountId: account.id,
      email: account.email
   }, JWT_SECRET, { expiresIn: 60 * 60 });

   // if `signup` and `forget`, send email with token
   if (['signup', 'forget'].some(req.params.access_type)) {
      // ...
      // ...
   }

   // if `forget` - do no send token in response
   if (req.params.access_type == 'forget') {
      res.status(200).end();
      return; //unnecessary?
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
   const { email, accountId } = req.token || {};
   if (!email || !accountId) {
      res.status(400).send({
         error: `invalid_request`,
         error_description: 'Invalid token'
      });
   }

   let account;
   switch (type) {
      case 'logout':
         account = await authenticate.logout({ email, accountId });
         // check if email, accountId exist and active

         return;
      case 'verify': // token in email link, to request header, when `signup` and when `reset`


         account = await authenticate.verify({ email, accountId });
         // check if email, accountId exist and active

         break;
      case 'deactivate':
         account = await authenticate.deactivate({ email, accountId });
         // check if email, accountId exist and active

         break;

      default:
         res.status(400).send({
            error: `invalid_egress`,
            error_description: `Unsupported egress type.`
         });
         return;
   }

});








export default router;