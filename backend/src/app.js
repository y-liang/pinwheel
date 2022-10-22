import express from 'express';
import cors from 'cors';

import { default as routerReview } from './frames/review/review.js';
import { default as routerAccount } from './frames/account/account.js';
import { default as rateLimiter } from './library/middleware/rateLimiter.js';

const router = express.Router();


router.use(cors()); // for communicating between frontend to backend
router.use(express.json()); // for parsing application/json;charset=UTF-8, eg. generating req.body

// middleware
router.use(rateLimiter);

router.use('/account', routerAccount);
router.use('/review', routerReview);

export default router;