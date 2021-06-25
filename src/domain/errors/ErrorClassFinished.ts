export default class ErrorBelowMinimumAge extends Error{
  status=402
  
  constructor () {
    super();
    this.name = "ClassFinished";
    this.message = "Class is already finished";
    Error.captureStackTrace(this, this.constructor);
  }
}