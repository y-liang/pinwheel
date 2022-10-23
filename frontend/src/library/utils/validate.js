// regex
// const validName = value => /^[a-z0-9]{6,18}$/.test(value); // only allow lowercase letters and numbers, min 6 max 18 length
// const validEmail = value => /^[a-z0-9-+.]+@[a-z0-9-.]+\.[a-z0-9]+$/.test(value); // on front end, use form input type="email" in html to validate as well. best way is to send an email to verify
// const validPassword = value => /^[^\s]{6,36}$/.test(value); // allow any characters except whitespace /s, min 6 max 36 length

const regexValid = {
   // name: value => /^[a-z0-9]{6,18}$/.test(value),
   email: value => /^[a-z0-9-+.]+@[a-z0-9-.]+\.[a-z0-9]+$/.test(value),
   password: value => /^[^\s]{6,36}$/.test(value),
};

// fields - { email, password }
export default function validateFields(fields) {
   Object.entries(fields).forEach((key, value) => {
      if (typeof value !== 'string' || value.length < 3) {
         return {
            description: `Sorry. Your ${key} must be between 6 and 30 characters long.`
         };
      }

      if (!regexValid[key]) {
         return {
            description: `Enter a valid ${key}.`
         };
      }
   });
}