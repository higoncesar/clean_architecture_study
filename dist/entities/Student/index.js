"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("../Cpf"));
const errors_1 = require("../../errors");
class Student {
    constructor({ name, cpf }) {
        if (!this.validateName(name)) {
            throw (new errors_1.ErrorName());
        }
        else {
            this.name = name;
            this.cpf = new Cpf_1.default(cpf).value;
        }
    }
    validateName(name) {
        return /^([A-Za-z]+ )+([A-Za-z])+$/.test(name);
    }
}
exports.default = Student;
