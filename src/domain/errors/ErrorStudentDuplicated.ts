export default class ErrorStudentDuplicated extends Error {
  status=402

  constructor() {
    super();
    this.name = 'Error Student Duplicated';
    this.message = 'Error student duplicated';
    Error.captureStackTrace(this, this.constructor);
  }
}
