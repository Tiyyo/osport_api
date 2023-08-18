export default class ServerError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "ServerError";
        this.cause = message;
        this.status = 500;
        this.userMessage = 'Internal server error';
    }
}
