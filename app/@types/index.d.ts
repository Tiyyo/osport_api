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

export type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

export type Player = {
  id: number;
  rating: number;
};

export type TeamGeneratorConfig = {
  participants: number;
  ids: number[];
  values: number[];
  team1: Player[];
  team2: Player[];
};
