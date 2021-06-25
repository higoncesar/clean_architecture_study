export default class ErrorCpf extends Error {
  status = 402;

  constructor() {
    super();
    this.name = 'Error Cpf';
    this.message = 'Invalid cpf';
    Error.captureStackTrace(this, this.constructor);
  }
}
