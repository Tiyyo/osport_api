import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import ServerError from '../helpers/errors/server.error.ts';
import ValidationError from '../helpers/errors/validation.error.ts';

//  We don't use ZodError formErrors accessor
// because we can't associate the error with the field

// schema validator middleware
// it validates the request body, params or query
// against a schema
// if the schema is not valid it throws a ValidationError
// else it calls the next middleware

export default (schema: AnyZodObject, canal: 'body' | 'params' | 'query') => async (req: Request, _res: Response, next: NextFunction) => {
  if (!schema) next(new ServerError('No schema provided'));

  try {
    await schema.parseAsync(req[canal]);
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
