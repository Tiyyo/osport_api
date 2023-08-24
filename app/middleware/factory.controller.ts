import { NextFunction, Request, Response } from 'express';
import { Redis } from 'ioredis';
import logger from '../helpers/logger.ts';

const redis = new Redis();

// factory design pattern
// it returns a middleware function

export default (key: string) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cacheValue = await redis.get(key).catch((error) => {
    logger.error(error);
    next();
  });
  if (cacheValue) {
    // not modfied
    res.status(304).send(JSON.parse(cacheValue));
  }
  req.body.cacheKey = key;
  next();
};
