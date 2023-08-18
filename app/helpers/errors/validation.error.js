export default class ValidationError extends Error {
    constructor(message, fieldErrors) {
        super(message);
        this.message = message;
        this.status = 404;
        this.fieldErrors = fieldErrors;
        this.name = "ValidationError";
    }
}
