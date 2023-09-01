export default class ValidationError extends Error {
    status;
    name;
    fieldErrors;
    userMessage;
    constructor(message, fieldErrors) {
        super(message);
        this.message = message;
        this.status = 400;
        this.fieldErrors = fieldErrors;
        this.userMessage = 'Invalid input';
        this.name = 'ValidationError';
    }
}
