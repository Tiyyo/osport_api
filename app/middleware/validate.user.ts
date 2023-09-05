import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthorizationError from '../helpers/errors/unauthorized.error.js';

const { verify } = jwt;

const validateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next();
  let token: string = '';
  let userInfos: any = {};

  if (req.cookies && req.cookies.accessToken) token = req.cookies.accessToken;

  verify(token, process.env.JWT_TOKEN_KEY as string, async (err, decoded) => {
    if (err || !decoded || typeof decoded === 'string') next(new AuthorizationError('Unauthorized'));
    if (decoded) userInfos = decoded;

    const headersUserId = userInfos[0].userId;
    const bodyUserId = req.body.userId;

    if (headersUserId !== bodyUserId) next(new AuthorizationError('Unauthorized user'));
  });
};

export default validateUser;
