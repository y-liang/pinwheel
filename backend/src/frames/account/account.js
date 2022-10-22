


// import express from 'express';
// import jwt from 'jsonwebtoken';
// import authenticate from '../../gears/authenticate.js';


// const router = express.Router();

// const { JWT_SECRET } = process.env;


// router.get('/verify', async (req, res) => {

//    jwt.verify();
//    // below keep
//    // if (!accountId) {
//    //    res.status(400).send({ error: `No cookie session found` });
//    //    return;
//    // }

//    // const data = authenticate.verify({ accountId });
//    // if (data?.error) {
//    //    res.status(400).send({ error: `No such account` });
//    //    return;
//    // }


// });



// // move bad request function from frontend here??? and the form data error???
// // routes only, authenticate handles queries
// router.post('/signup', async (req, res) => {
//    console.log('req.body', req.body);

//    const { email, password } = req.body;

//    console.log('{ email, password } ', { email, password });
//    const account = await authenticate.signup({ email, password });

//    // if no account from above, it means either account already exists or database error
//    if (account.error) {
//       res.status(400).send({ error: account.error });
//       return;
//    }


//    // create token
//    const token = jwt.sign({ accountId: account.id }, JWT_SECRET, { expiresIn: 60 * 60 });
//    // res.setHeader('Authorization', `Bearer ${token}`);


//    // rfc requirements?
//    res.setHeader('Cache-Control', 'no-cache');

//    res.status(200).end(); // nothing to send except if above error
// });

// router.post('/login', async (req, res) => {
//    const { email, password } = req.body;
//    const account = await authenticate.login({ email, password });

//    if (account.error) {
//       res.status(400).send({ error: account.error });
//       return;
//    }

//    // create session - need to check if session already exists???
//    req.session.accountId = account.id;

//    // res.status(200).send(data);

//    res.status(200).send({ accountId: account.id });

// });


// router.post('/logout', async (req, res) => {

// });

// export default router;