import { ZodError } from 'zod';
import ServerError from '../helpers/errors/server.error.js';
import ValidationError from '../helpers/errors/validation.error.js';
export default (schema, canal) => async (req, _res, next) => {
    if (!schema)
        next(new ServerError('No schema provided'));
    try {
        await schema.parseAsync(req[canal]);
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            const fieldErros = {};
            error.issues.forEach((e) => {
                fieldErros[e.path[0]] = e.message;
            });
            next(new ValidationError('Schema is not valid', fieldErros));
        }
        next(error);
    }
};
