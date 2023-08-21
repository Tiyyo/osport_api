import { NextFunction, Request, Response } from 'express';

export type Controller = (req: Request, res: Response, next?: NextFunction) => any | Promise<any>;

export const canals = {
  body: 'body',
  params: 'params',
  query: 'query',
} as const;

export type LoginForm = {
  emailOrUsername: string;
  password: string;
};
