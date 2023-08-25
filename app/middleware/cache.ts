import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger.ts';
import Cache from '../service/cache.ts';

export default (key: string) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!key) next();
  let paramsKey = key;
  if (req.params.id) paramsKey = key + req.params.id;
  try {
    const cacheValue = await Cache.get(paramsKey);
    if (req.method === 'GET' && cacheValue) {
      // not modfied
      res.status(304).send(cacheValue);
    }
    req.body.cacheKey = paramsKey;
    next();
  } catch (error) {
    logger.error(error);
    next();
  }
};
