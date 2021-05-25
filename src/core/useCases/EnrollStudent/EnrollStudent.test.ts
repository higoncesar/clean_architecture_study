import EnrollStudent, {TypeEnrollmentRequest} from "./index";
import {ErrorName, ErrorCpf, ErrorStudentDuplicated} from '../../errors'

it("Should not enroll without valid student name", function () {
    const enrollmentRequest:TypeEnrollmentRequest = {
        student: {
            name: "Ana",
            cpf: "832.081.519-34",
        }
    }  
    const enrollStudent = new EnrollStudent();
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new ErrorName())
});


it("Should not enroll without valid student cpf", function () {
    const enrollmentRequest:TypeEnrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "123.456.789-99"
        }
    }
    const enrollStudent = new EnrollStudent();
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new ErrorCpf())
});

it("Should not enroll duplicated student", function () {
    const enrollmentRequest:TypeEnrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "832.081.519-34"
        }
    }
    const enrollStudent = new EnrollStudent();
    enrollStudent.execute(enrollmentRequest)
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new ErrorStudentDuplicated())
});