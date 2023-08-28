import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthorizationError from '../helpers/errors/unauthorized.error.ts';
import User from '../models/user.ts';

const { verify } = jwt;

const validateUser = async (req: Request, _res: Response, next: NextFunction) => {
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

  const user = await User.findById(headersUserId);
  if (headersUserId === bodyUserId && user?.id === bodyUserId) {
    next();
  }
  next(new AuthorizationError('Unauthorized user'));
};

export default validateUser;
