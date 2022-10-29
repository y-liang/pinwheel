import sgMail from '@sendgrid/mail';




export default async function sendEmail(type, mailto, link) {
   const { SENDGRID_API_KEY: apiKey } = process.env;
   console.log('apiKey', apiKey);

   sgMail.setApiKey(apiKey);
   const msg = {
      to: 'mailto',
      from: 'noreply@waybark.com', // Use the email address or domain you verified above
      subject: 'Sending with Pinwheel is Fun',
      text: 'hello world',
      html: '<strong>happy friday</strong>',
   };

   try {
      await sgMail.send(msg);
   } catch (error) {
      console.error(error);

      if (error.response) {
         console.error(error.response.body);
      }
   }
}

