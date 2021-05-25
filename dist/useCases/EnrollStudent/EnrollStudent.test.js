"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const errors_1 = require("../../errors");
it("Should not enroll without valid student name", function () {
    const enrollmentRequest = {
        student: {
            name: "Ana",
            cpf: "832.081.519-34",
        }
    };
    const enrollStudent = new index_1.default();
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new errors_1.ErrorName());
});
it("Should not enroll without valid student cpf", function () {
    const enrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "123.456.789-99"
        }
    };
    const enrollStudent = new index_1.default();
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new errors_1.ErrorCpf());
});
it("Should not enroll duplicated student", function () {
    const enrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "832.081.519-34"
        }
    };
    const enrollStudent = new index_1.default();
    enrollStudent.execute(enrollmentRequest);
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new errors_1.ErrorStudentDuplicated());
});
