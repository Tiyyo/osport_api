import express, { Router } from 'express';
import errorHandler from '../middleware/error.handler.ts';
import authRouter from './auth.router.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';
import { generateBalancedTeam } from '../service/teams/generateTeam.ts';

const router: Router = express.Router();

router.use('/', authRouter);

router.get('/healtcheck', (_req, res) => {
  res.status(200).json({ message: 'Server is up and running' });
});

router.get('/test', (_req, res) => {
  generateBalancedTeam();
  res.status(200).json('ok');
});

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
router.use((_req, _res, _next) => {
  throw new NotFoundError("Route doesn't exist");
});
// eslint-enable-next-line @typescript-eslint/no-unused-vars

router.use(errorHandler);

export default router;
