import express, { Router } from 'express';
import errorHandler from '../middleware/error.handler.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import eventRouter from './event.router.js';
import NotFoundError from '../helpers/errors/notFound.error.js';
import participantRouter from './participant.router.js';
import friendlistRouter from './friendlist.router.js';
import messageRouter from './message.router.js';
import ratingRouter from './rating.router.js';
import { generateBalancedTeam } from '../service/generateTeam.js';

const router: Router = express.Router();

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/chat', messageRouter);
router.use('/participant/event', participantRouter);
router.use('/user_friends', friendlistRouter);
router.use('/', ratingRouter);
router.use('/event', eventRouter);

router.use('/test', async (_req, res) => {
  generateBalancedTeam(1);
  res.send('test');
});
router.get('/', async (_req, res) => {
  res.send('Welcome to O\'Sport API');
});

router.use(() => {
  throw new NotFoundError("Route doesn't exist");
});

router.use(errorHandler);

export default router;
