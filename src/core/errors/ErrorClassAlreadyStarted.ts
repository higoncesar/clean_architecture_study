export default class ErrorClassAlreadyStarted extends Error{
  status=402
  
  constructor () {
    super();
    this.name = "ErrorClassAlreadyStarted";
    this.message = "Class is already started";
    Error.captureStackTrace(this, this.constructor);
  }
}