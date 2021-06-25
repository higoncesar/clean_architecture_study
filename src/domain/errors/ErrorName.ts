export default class ErrorName extends Error {
  status = 402;

  constructor() {
    super();
    this.name = 'Error Name';
    this.message = 'Invalid name';
    Error.captureStackTrace(this, this.constructor);
  }
}
