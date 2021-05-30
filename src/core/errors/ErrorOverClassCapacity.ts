export default class ErrorOverClassCapacity extends Error{
  status=402
  
  constructor () {
    super();
    this.name = "ErrorOverClassCapacity";
    this.message = "Over class capacity";
    Error.captureStackTrace(this, this.constructor);
  }
}