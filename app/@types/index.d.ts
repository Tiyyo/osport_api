import { NextFunction, Request, Response } from 'express';

export type Controller = (req: Request, res: Response, next?: NextFunction) => any | Promise<any>;

export type LoginForm = {
  username: string;
  password: string;
};

export type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';
