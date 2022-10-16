import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { router as routerReview } from './frames/review';
const app = express();
const { PORT } = process.env;

app.get('/', (req, res) => {
   res.send('Hello World!');
});



app.use('/reviews', routerReview);



app.listen(PORT, () => {
   console.log(`app listening on port ${PORT}`);
});