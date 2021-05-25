"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorName extends Error {
    constructor() {
        super();
        this.status = 402;
        this.name = "Error Name";
        this.message = "Invalid name";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorName;
