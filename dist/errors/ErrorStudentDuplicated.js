"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorStudentDuplicated extends Error {
    constructor() {
        super();
        this.status = 402;
        this.name = "Error Student Duplicated";
        this.message = "Error student duplicated";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorStudentDuplicated;
