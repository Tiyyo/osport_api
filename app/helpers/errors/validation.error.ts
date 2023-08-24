export default class ValidationError extends Error {
  status: number;

  name: string;

  fieldErrors: Record<string, string>;

  constructor(message: string, fieldErrors: Record<string, string>) {
    super(message);
    this.message = message;
    this.status = 400;
    this.fieldErrors = fieldErrors;
    this.name = 'ValidationError';
  }
}
