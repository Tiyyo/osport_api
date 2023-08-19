export default class UserInputError extends Error {
    constructor(message, userMessage) {
        super(message);
        this.name = "UserInputError";
        this.status = 400;
        this.userMessage = userMessage ?? "Invalid input";
        this.message = message;
    }
}
