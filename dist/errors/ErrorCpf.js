"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorCpf extends Error {
    constructor() {
        super();
        this.status = 402;
        this.name = "Error Cpf";
        this.message = "Invalid cpf";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorCpf;
