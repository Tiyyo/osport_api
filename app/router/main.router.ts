import express, { Router } from 'express';
import errorHandler from '../middleware/error.handler.ts';
import authRouter from './auth.router.ts';
import userRouter from './user.router.ts';
import friendlistRouter from './friendlist.router.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';
import messageRouter from './message.router.ts';
import { generateBalancedTeam } from '../service/generateTeam.ts';


const router: Router = express.Router();
router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/chat', messageRouter);

router.use('/user', userRouter);
router.use('/', friendlistRouter);

router.get('/test', (_req, res) => {
  generateBalancedTeam();
  res.status(200).json('ok');
});

router.use(() => {
  throw new NotFoundError("Route doesn't exist");
});

router.use(errorHandler);

export default router;
