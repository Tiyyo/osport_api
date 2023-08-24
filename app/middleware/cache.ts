import { NextFunction, Request, Response } from 'express';

async function cacheMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
  key: string,
) {
  next();
}

export default cacheMiddleware;
