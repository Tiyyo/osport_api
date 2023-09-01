import DatabaseError from '../helpers/errors/database.error.js';
import ServerError from '../helpers/errors/server.error.js';
import AuthorizationError from '../helpers/errors/unauthorized.error.js';
import ValidationError from '../helpers/errors/validation.error.js';
import logger from '../helpers/logger.js';
import NotFoundError from '../helpers/errors/notFound.error.js';
import UserInputError from '../helpers/errors/userInput.error.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error, _req, res, _next) => {
    console.log(error);
    if (error instanceof AuthorizationError
        || error instanceof ServerError
        || error instanceof NotFoundError) {
        logger.error(`${error.name} ${error.message}`);
        return res.status(error.status).json({ error: error.userMessage });
    }
    if (res.app.get('env') !== 'development' && error instanceof DatabaseError) {
        return res.status(200).json({ error: error.message });
    }
    if (error instanceof UserInputError)
        return res.status(200).json({ error: error.userMessage });
    if (error instanceof ValidationError) {
        logger.error(`${error.name} ${error.message}`);
        return res.status(200).json({ error: error.userMessage });
    }
    if (res.app.get('env') !== 'development') {
        return res.status(500).send('Internal Server Error');
    }
    const unknowError = 'Unknow error';
    logger.error(`${unknowError + error.message}`);
    return res.status(500).send({ error: error.message });
};
// eslint-enable-next-line @typescript-eslint/no-unused-vars
export default errorHandler;