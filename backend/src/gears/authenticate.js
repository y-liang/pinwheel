/**
   Export a function called login that accepts the email and password
   Queries prisma for an account with the email
   If there is no account found, return null
   Use encrypt functions hash and compare to compare the given password to the account's passHash
   If the passwords don't match, return null
   If the passwords match, return the account
 */

import encrypt from '../library/utils/encrypt.js';
import { default as db } from '../../database/main.js';
import { verify } from 'jsonwebtoken';

// acceptable data shape https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics#introducing_constructors
// {
//    email;
//    password;
// } // just nice to group the credentials in an object

const authenticate = {
   // verify cookie session?
   async verify({ accountId }) {
      const accountExists = await db.account.findFirst({
         where: { id: accountId },
      });

      // no account id match
      if (!accountExists) return { description: `Malicious attempt!` };

   },



   async signup({ email, password }) {
      const accountExists = await db.account.findFirst({
         where: { email },
      });
      // if (accountExists) return null;
      if (accountExists) return { description: `An account with email ${email} already exists.` };

      const passHash = await encrypt.hash(password, 10);
      const account = await db.account.create({
         data: { email, passHash },
      });
      return { id: account.id, email };
   },

   async login({ email, password }) {
      const account = await db.account.findUnique({
         where: { email },
      });
      // if (!account) return null;
      if (!account) return { description: `An account with email ${email} does not exists.` };

      const isPasswordCorrect = await encrypt.compare(
         password,
         account.passHash
      );
      // if (!isPasswordCorrect) return null;
      if (!isPasswordCorrect) return { description: `Incorrect password for email ${email}.` };

      return { id: account.id, email };
   },

   async logout() {

   },

   async verify() {

   },

   async forget() {

   },

   async reset() {

   },

   async deactivate() {

   }



};



export default authenticate;

