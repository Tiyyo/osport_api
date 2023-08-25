import express, { Router } from 'express';
import errorHandler from '../middleware/error.handler.ts';
import authRouter from './auth.router.ts';
import userRouter from './user.router.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';
import participantRouter from './participant.router.ts';
import friendlistRouter from './friendlist.router.ts';
import messageRouter from './message.router.ts';
import upload from '../service/upload.ts';
import { writeFile } from '../service/image.ts';

import Image from '../models/image.ts';

const router: Router = express.Router();

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/chat', messageRouter);
router.use('/participant/event', participantRouter);
router.use('/user_friends', friendlistRouter);

router.use('/test', upload.single('image'), async (req, res) => {
  const { buffer } = req.file;

  try {
    const { relativePath, name } = await writeFile(buffer);
    await Image.create({
      url: relativePath,
      title: name,
    });
  } catch (error) {
    throw new Error('Could not create image');
  }
  res.send('Hello world');
});

router.use(() => {
  throw new NotFoundError("Route doesn't exist");
});

router.use(errorHandler);

export default router;
