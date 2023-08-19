import { ZodError } from "zod";
import ServerError from "../helpers/errors/server.error";
import ValidationError from "../helpers/errors/validation.error";
export default (schema, canal) => async (request, _res, next) => {
    if (!schema)
        return next(new ServerError('No schema provided'));
    try {
        await schema.parseAsync(request[canal]);
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            const fieldErros = {};
            // We don't use ZodError formErrors accessor because we can't associate the error with the field
            error.issues.map((e) => {
                return fieldErros[e.path[0]] = e.message;
            });
            next(new ValidationError("Schema is not valid", fieldErros));
        }
        next(error);
    }
};
