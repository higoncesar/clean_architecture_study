"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateCpf_1 = __importDefault(require("./utils/validateCpf"));
class EnrollStudent {
    constructor() {
        this.database = [];
    }
    execute(enrollment) {
        const isValidName = /^([A-Za-z]+ )+([A-Za-z])+$/.test(enrollment.student.name);
        if (!isValidName) {
            throw (new Error("Invalid student name"));
        }
        const isValidCpf = validateCpf_1.default(enrollment.student.cpf);
        if (!isValidCpf) {
            throw (new Error("Invalid student cpf"));
        }
        const isDuplicated = this.database.find(item => item.student.cpf === enrollment.student.cpf);
        if (isDuplicated) {
            throw (new Error("Enrollment with duplicated student is not allowed"));
        }
        this.database.push(enrollment);
        return enrollment;
    }
}
exports.default = EnrollStudent;
