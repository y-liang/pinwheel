const { BACKEND_URL } = process.env;
const baseurl = BACKEND_URL;

/**
 * endpoint /token
 * both functions only should be called in auth-provider
 * in other components, useAuth - auth.access and auth.egress
 */

const fetcher = {
   /* post - to receive token - access type
    * type/fields - signup/credentials | login/password | forget/email | reset/credentials | deactivate
    * fields { email, password = null } return { access_token, token_type, expires_in } or { alert, alert_description } */

   async access(type, fields) {
      const url = `${baseurl}/token?access_type=${type}`;
      const response = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json;charset=UTF-8',
         },
         body: JSON.stringify(fields),
      });
      const data = await response.json(); // check response.ok?

      return data;
   },

   /* get - to send token - egress type
    * type - logout | verify 
    * return { refresh_token, token_type, expires_in } or { alert, alert_description } */

   async egress(type, token) {
      const url = `${baseurl}/token?egress_type=${type}`;
      const response = await fetch(url, {
         method: 'GET',
         headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8', // not sure
         },
      });
      const data = await response.json(); // check response.ok?

      return data;
   }

};


export default fetcher;