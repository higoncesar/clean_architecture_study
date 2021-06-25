export default class ErrorBelowMinimumAge extends Error{
  status=402
  
  constructor () {
    super();
    this.name = "ErrorBelowMinimumAge";
    this.message = "Below minimum age";
    Error.captureStackTrace(this, this.constructor);
  }
}