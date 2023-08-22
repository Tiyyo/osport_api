import express, { Router } from 'express';
import errorHandler from '../middleware/error.handler.ts';
import authRouter from './auth.router.ts';
import friendlistRouter from './friendlist.router.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';

const router: Router = express.Router();

router.use('/', authRouter);
router.use('/', friendlistRouter);

router.get('/test', (_req, res) => {
  res.status(200).send({
    message: 'Welcome to the API',
  });
});

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
router.use((_req, _res, _next) => {
  throw new NotFoundError("Route doesn't exist");
});
// eslint-enable-next-line @typescript-eslint/no-unused-vars

router.use(errorHandler);

export default router;
