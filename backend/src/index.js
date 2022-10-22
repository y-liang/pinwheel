
import express from 'express';
import { config } from 'dotenv';
import { default as routerApp } from './app.js';

config(); // env
const { PORT } = process.env;

const app = express();

// all routes are in app.js
app.use('/', routerApp);


app.listen(PORT, () => {
   console.log(`app listening on port ${PORT}`);
});