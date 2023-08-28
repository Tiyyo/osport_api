import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthorizationError from '../helpers/errors/unauthorized.error.ts';
import User from '../models/user.ts';
import NotFoundError from '../helpers/errors/notFound.error.ts';

const { verify } = jwt;

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  let token: string = '';
  let userInfos: any = {};

  if (req.cookies && req.cookies.accessToken) token = req.cookies.accessToken;

  verify(token, process.env.JWT_TOKEN_KEY as string, (err, decoded) => {
    if (err) next(new AuthorizationError('Unauthorized user'));
    userInfos = decoded[0];
  });
  if (!userInfos) next(new AuthorizationError('Unauthorized user'));
  const headersUserId = userInfos.userId;
  const bodyUserId = req.body.id;

  try {
    const user = await User.getUserInfos(headersUserId);
    if (headersUserId === bodyUserId && user?.id === bodyUserId) {
      return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return next(error);
  }
};

export default validateUser;
