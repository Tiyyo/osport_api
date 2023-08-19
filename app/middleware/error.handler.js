import DatabaseError from "../helpers/errors/database.error";
import ServerError from "../helpers/errors/server.error";
import AuthorizationError from "../helpers/errors/unauthorized.error";
import ValidationError from "../helpers/errors/validation.error";
import logger from "../helpers/logger";
import NotFoundError from "../helpers/errors/notFound.error";
import UserInputError from "../helpers/errors/userInput.error";
export const errorHandler = (error, _req, res, next) => {
    if (error instanceof ValidationError) {
        logger.error(error.name + " " + error.message);
        return res.status(error.status).json({
            error: error.fieldErrors,
        });
    }
    if (error instanceof AuthorizationError || error instanceof ServerError || error instanceof DatabaseError || error instanceof NotFoundError || error instanceof UserInputError) {
        logger.error(error.name + " " + error.message);
        return res.status(error.status).json({ error: error.userMessage });
    }
    if (res.app.get('env') !== 'development') {
        return res.status(500).send('Internal Server Error');
    }
    else {
        logger.error("Unknow error" + " " + error.message);
        return res.status(500).send({ error: error.message });
    }
};
