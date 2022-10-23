const { BACKEND_URL } = process.env;
const baseurl = BACKEND_URL;


/**
 * endpoint /token
 * both functions only should be called in auth-provider
 * in other components, useAuth - auth.access and auth.egress
 */







/**
 * post - to receive token - access type
 * type/fields - signup/credentials | login/password | forget/email | reset/credentials | deactivate
 * fields { email, password = null }
 * return { access_token, token_type, expires_in } or { description }
 */
export function tokenAccess(type, fields) {
   const url = `${baseurl}/token?access_type=${type}`; // grant_type
   const response = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded', // not sure
      },
      body: JSON.stringify(fields),
   });
   const data = await response.json(); // check response.ok?
   return data;
}

/**
 * get - to send token - egress type
 * type - logout | verify 
 * fields { email, password = null }
 * return { refresh_token, token_type, expires_in } or { description }
 */
export function tokenEgress(type, token) {
   const url = `${baseurl}/token?egress_type=${type}`;
   const response = await fetch(url, {
      method: 'GET',
      headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/x-www-form-urlencoded', // not sure
      },
   });
   const data = await response.json(); // check response.ok?
   return data;
}


/** token */
// reference Resource Owner Password Credentials Grant https://www.rfc-editor.org/rfc/rfc6749#section-4.3
// response ok https://www.rfc-editor.org/rfc/rfc6749#section-5.1
// Content-Type: application/json;charset=UTF-8
// Cache-Control: no-store
// Pragma: no-cache
// {
//   "access_token":"2YotnFZFEjr1zCsicMWpAA",
//   "token_type":"example",
//   "expires_in":3600,
//   "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
//   "example_parameter":"example_value"
// }

// error response https://www.rfc-editor.org/rfc/rfc6749#section-5.2
// HTTP/1.1 400 Bad Request
// Content-Type: application/json;charset=UTF-8
// Cache-Control: no-store
// Pragma: no-cache
// {
//   "error":"invalid_request"
// }



/** resource */
// reference Accessing Protected Resources https://www.rfc-editor.org/rfc/rfc6749#section-7





