export default class NotFoundError extends Error {
    status;
    name;
    userMessage;
    constructor(message) {
        super(message);
        this.message = message;
        this.status = 404;
        this.userMessage = "Item(s) couldn't be found";
        this.name = 'NotFoundError';
    }
}
