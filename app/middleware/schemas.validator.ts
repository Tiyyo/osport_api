import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import ServerError from '../helpers/errors/server.error.ts';
import ValidationError from '../helpers/errors/validation.error.ts';

//  We don't use ZodError formErrors accessor
// because we can't associate the error with the field

export default (schema: AnyZodObject, canal: 'body' | 'params' | 'query') => async (request: Request, _res: Response, next: NextFunction) => {
  if (!schema) next(new ServerError('No schema provided'));
  try {
    await schema.parseAsync(request[canal]);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErros: Record<string, string> = {};
      error.issues.forEach((e) => {
        fieldErros[e.path[0]] = e.message;
      });
      next(new ValidationError('Schema is not valid', fieldErros));
    }
    next(error);
  }
};
