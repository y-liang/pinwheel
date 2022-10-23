/**
 * interaction between backend and database
 */

import encrypt from '../library/utils/encrypt.js';
import { default as db } from '../../database/main.js';



// check
// signup | login | reset | deactivate | reactivate | forget
// logout | verify


const authenticate = {
   // check if account is active
   async check(accountId) {
      // const account = await db.account.findFirst({
      //    where: { id: accountId },
      // });

      // // no account id match or isDeactivated
      // if (!account || account.isDeactivated) {
      //    return {
      //       description: `An account with email ${email} does not exists.`
      //    };
      // }

      // return true; // not sure if to return profile id


      // get the account record with an id
      // or select the id field of one account record with an id
      const account = await db.account.findUnique({
         where: {
            id: accountId,
            isDeactivated: false
         },
         select: {
            id: true,
            // email: true
         } // can omit select here
      });

      if (account) {
         return true;
      }

   },


   // table activities
   async mark(action, accountId) {
      await db.activity.create({
         data: {
            action,
            actorId: accountId
         },
      });
   },




   async signup({ email, password }) {
      const accountExists = await db.account.findFirst({
         where: {
            email,
         },
         select: {
            id: true,
            isDeactivated: true
         }
      });

      // if account exists
      if (accountExists) {
         if (!isDeactivated) {
            return {
               description: `An account with email ${email} already exists.`
            };
         }

         // if account exists but isDeactivated, reactivate, update it to be false
         const { id: accountId } = accountExists;
         const passHash = await encrypt.hash(password, 10);
         await db.account.update({
            data: {
               isDeactivated: false,
               passHash
            },
            where: {
               id: accountId
            }
         });

         return { accountId, email };
      };

      // not exist, create account
      const passHash = await encrypt.hash(password, 10);
      const { id: accountId } = await db.account.create({
         data: {
            email,
            passHash
         },
         select: {
            id: true,
         }
      });

      return { accountId, email };
   },

   async login({ email, password }) {
      const { id: accountId, passHash } = await db.account.findUnique({
         where: {
            email,
            isDeactivated: false
         },
         select: {
            id: true,
            passHash: true
         }
      });
      // if (!account) return null;
      if (!accountId) {
         return {
            description: `An account with email ${email} does not exists.`
         };
      }

      const isPasswordCorrect = await encrypt.compare(
         password,
         passHash
      );
      // if (!isPasswordCorrect) return null;
      if (!isPasswordCorrect) {
         return {
            description: `Incorrect password for email ${email}.`
         };
      }

      return { accountId, email };
   },

   // unnecessary
   // async logout(accountId) {
   //    return;
   // },


   // create a profile for verified account
   async verify(accountId, email) {
      // check if profile exists, account already verified
      const profileExists = await db.profile.findUnique({
         where: {
            accountId,
         },
         select: {
            id: true,
            deleted: true
         }
      });

      // if profile exists
      if (profileExists) {
         if (!isDeleted) {
            return {
               description: `An account with email ${email} has already been verified.`
            };
         }

         // if profile exists but isDeleted, update it to be false, keep other fields as is
         const { id: profileId } = accountExists;
         await db.account.update({
            data: {
               isDeleted: false,
            },
            where: {
               id: profileId,
            }
         });

         return { profileId };
      }

      // not exist, create profile
      const { id: profileId } = await db.profile.create({
         data: {
            accountId,
         },
         select: {
            id: true,
         }
      });

      return { profileId };
   },

   async forget({ email, password }) {
      const result = await this.login({ email, password });
      if (result.description) {
         return {
            description: result.description
         };
      }

      // else return and proceed the email send in the /token route
      return; // unnecessary?
   },

   async reset({ email, password }) {
      const passHash = await encrypt.hash(password, 10);
      const { id: accountId } = await db.account.update({
         data: {
            passHash,
         },
         where: {
            email,
         }
      });

      return { accountId, email };
   },

   async deactivate({ email, password }) {
      const result = await this.login({ email, password });
      if (result.description) {
         return {
            description: result.description
         };
      }

      // else update
      await db.account.update({
         data: {
            isDeactivated: true
         },
         where: {
            email,
         }
      });

      return; // unnecessary? successful return null? unsuccessful return error?
   },

   // unnecessary? signup covers reactivate
   // almost identical to deactivate, consider combine
   // async reactivate({ email, password }) {
   //    const result = await this.login({ email, password });
   //    if (result.description) {
   //       return {
   //          description: result.description
   //       };
   //    }

   //    // else update
   //    await db.account.update({
   //       data: {
   //          isDeactivated: false
   //       },
   //       where: {
   //          email,
   //       }
   //    });

   //    return; // unnecessary? successful return null? unsuccessful return error?
   // },

};




export default authenticate;

