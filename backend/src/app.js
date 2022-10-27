import express from 'express';
import cors from 'cors';

import { default as routerReview } from './frames/review/review.js';
import { default as routerToken } from './frames/account/token.js';
import { default as rateLimiter } from './library/middleware/rate-limiter.js';

const router = express.Router();


router.use(cors()); // for communicating between frontend to backend
router.use(express.json()); // for parsing application/json;charset=UTF-8, eg. generating req.body

// rate limit middleware - not sure 
// router.use(rateLimiter);

router.use('/token', routerToken);
router.use('/review', routerReview);

export default router;