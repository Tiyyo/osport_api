import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.ts';

const { verify } = jwt;

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
  // let token: string = '';
  // let userInfos: JwtPayload = {};

  // if (req.cookies && req.cookies.accessToken) token = req.cookies.accessToken;
  // try {
  //   verify(token, process.env.JWT_TOKEN_KEY as string, (err, decoded) => {
  //     if (err) throw new Error('Unauthorized user');
  //     if (!decoded) throw new Error('No decoded token');
  //     if (typeof decoded === 'string') throw new Error('Decoded token is a string');
  //     userInfos = decoded;
  //   });

  //   if (!userInfos) throw new Error('No user infos');
  //   const headersUserId = userInfos[0].userId;
  //   const bodyUserId = req.body.id;

  //   try {
  //     const user = await User.getUserInfos(headersUserId);
  //     if (headersUserId === bodyUserId && user?.id === bodyUserId) {
  //       next();
  //     } else {
  //       throw new Error('Unauthorized user');
  //     }
  //   } catch (error) {
  //     res.status(200).json({ error: 'Unauthorized' });
  //   }
  // } catch (error) {
  //   res.status(200).json({ error: 'Unauthorized' });
  // }
};

export default validateUser;
