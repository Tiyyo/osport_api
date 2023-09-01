export default class AuthorizationError extends Error {
    message;
    status;
    cause;
    userMessage;
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'AuthorizationError';
        this.cause = message;
        this.status = 401;
        this.userMessage = 'You are not authorized to access this resource';
    }
}
