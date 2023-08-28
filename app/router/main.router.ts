import express, { Router } from 'express';
import errorHandler from '../middleware/error.handler.ts';
import authRouter from './auth.router.ts';
import userRouter from './user.router.ts';
// import eventRouter from './event.router.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';
import participantRouter from './participant.router.ts';
import friendlistRouter from './friendlist.router.ts';
import messageRouter from './message.router.ts';
import ratingRouter from './rating.router.ts';
import { generateBalancedTeam } from '../service/generateTeam.ts';

const router: Router = express.Router();

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/chat', messageRouter);
router.use('/participant/event', participantRouter);
router.use('/user_friends', friendlistRouter);
// router.use('/event', eventRouter);
router.use('/', ratingRouter);

router.use('/test', async (_req, res) => {
  generateBalancedTeam(1);
  res.send('test');
});

router.use(() => {
  throw new NotFoundError("Route doesn't exist");
});

router.use(errorHandler);

export default router;
