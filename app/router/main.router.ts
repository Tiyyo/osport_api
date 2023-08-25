import express, { Router } from 'express';
import errorHandler from '../middleware/error.handler.ts';
import authRouter from './auth.router.ts';
import userRouter from './user.router.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';
import participantRouter from './participants.router.ts';

const router: Router = express.Router();

router.use('/', authRouter);

router.use('/user', userRouter);

router.use('/participant/event', participantRouter);

router.get('/test', (_req, res) => {
  res.status(200).send({
    message: 'Welcome to the API',
  });
});

router.use(() => {
  throw new NotFoundError("Route doesn't exist");
});

router.use(errorHandler);

export default router;
