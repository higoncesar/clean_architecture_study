import EnrollStudent, {TypeEnrollmentRequest} from "./index";
import {ErrorName, ErrorCpf, ErrorStudentDuplicated, ErrorBelowMinimumAge, ErrorOverClassCapacity} from '../../errors'

it("Should not enroll without valid student name", function () {
    const enrollmentRequest:TypeEnrollmentRequest = {
        student: {
            name: "Ana",
            cpf: "832.081.519-34",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "1",
        class: "A"
    }  
    const enrollStudent = new EnrollStudent();
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new ErrorName())
});


it("Should not enroll without valid student cpf", function () {
    const enrollmentRequest:TypeEnrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "123.456.789-99",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "1",
        class: "A"
    }
    const enrollStudent = new EnrollStudent();
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new ErrorCpf())
});

it("Should not enroll duplicated student", function () {
    const enrollmentRequest:TypeEnrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "832.081.519-34",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "1",
        class: "A"
    }
    const enrollStudent = new EnrollStudent();
    enrollStudent.execute(enrollmentRequest)
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new ErrorStudentDuplicated())
});

it("Should generate enrollment code", function () {
    const enrollmentRequest:TypeEnrollmentRequest = {
        student: {
            name: "Maria Carolina Fonseca",
            cpf: "755.525.774-26",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "1",
        class: "A"
    }
    const enrollStudent= new EnrollStudent();
    const FULL_YEAR= new Date().getFullYear()
    const LEVEL= enrollmentRequest.level
    const MODULE= enrollmentRequest.module
    const CLASS= enrollmentRequest.class
    const SEQUENCE = "0001"
    const code=`${FULL_YEAR}${LEVEL}${MODULE}${CLASS}${SEQUENCE}`
    expect(enrollStudent.execute(enrollmentRequest).code).toEqual(code)
});

it("Should not enroll student below minimum age", function () {
    const enrollmentRequest:TypeEnrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "832.081.519-34",
            birthDate: "2020-01-19"
        },
        level: "EM",
        module: "1",
        class: "A"
    }
    const enrollStudent = new EnrollStudent();
    expect(()=>enrollStudent.execute(enrollmentRequest)).toThrow(new ErrorBelowMinimumAge())
});

it("Should not enroll student over class capacity", function () {
    const enrollmentRequest1:TypeEnrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "832.081.519-34",
            birthDate: "2000-01-19"
        },
        level: "EM",
        module: "1",
        class: "A"
    }

    const enrollmentRequest2:TypeEnrollmentRequest = {
        student: {
            name: "Mario Sérgio",
            cpf: "964.873.010-51",
            birthDate: "1970-05-09"
        },
        level: "EM",
        module: "1",
        class: "A"
    }

    const enrollmentRequest3:TypeEnrollmentRequest = {
        student: {
            name: "Marcos Paulo",
            cpf: "291.288.310-55",
            birthDate: "1970-05-09"
        },
        level: "EM",
        module: "1",
        class: "A"
    }

    const enrollStudent = new EnrollStudent();
    enrollStudent.execute(enrollmentRequest1)
    enrollStudent.execute(enrollmentRequest2)
    expect(()=>enrollStudent.execute(enrollmentRequest3)).toThrow(new ErrorOverClassCapacity())
});