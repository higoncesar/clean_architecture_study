"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = __importDefault(require("../../entities/Student"));
const errors_1 = require("../../errors");
class EnrollStudent {
    constructor() {
        this.database = [];
    }
    execute(enrollment) {
        const student = new Student_1.default(enrollment.student);
        const isDuplicated = this.database.find(item => item.student.cpf === enrollment.student.cpf);
        if (isDuplicated) {
            throw (new errors_1.ErrorStudentDuplicated());
        }
        this.database.push(enrollment);
        return enrollment;
    }
}
exports.default = EnrollStudent;
