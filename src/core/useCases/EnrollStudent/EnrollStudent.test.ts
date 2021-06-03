import EnrollStudent, {TypeEnrollmentRequest} from "./index";
import {ErrorName, ErrorCpf, ErrorStudentDuplicated, ErrorBelowMinimumAge, ErrorOverClassCapacity} from '../../errors'
import LevelRepositoryMemory from '../../repositories/memory/LevelRepositoryMemory'
import ModuleRepositoryMemory from '../../repositories/memory/ModuleRepositoryMemory'
import ClassroomRepositoryMemory from '../../repositories/memory/ClassroomRepositoryMemory'
import EnrollmentRepositoryMemory from '../../repositories/memory/EnrollmentRepositoryMemory'

let enrollStudent: EnrollStudent

beforeEach(()=>{
    const levelRepository = new LevelRepositoryMemory()
    const moduleRepository = new ModuleRepositoryMemory()
    const classroomRepository = new ClassroomRepositoryMemory()
    const enrollmentRepository =  new EnrollmentRepositoryMemory()
    enrollStudent = new EnrollStudent(levelRepository, moduleRepository, classroomRepository, enrollmentRepository)
})

it("Should not enroll without valid student name", function () {
    const enrollmentRequest:TypeEnrollmentRequest = {
        student: {
            name: "Ana",
            cpf: "832.081.519-34",
            birthDate: "2002-03-12"
        },
        level: "EM",
        module: "3",
        classroom: "A"
    }     
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
        module: "3",
        classroom: "A"
    }
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
        module: "3",
        classroom: "A"
    }
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
        module: "3",
        classroom: "A"
    }
    expect(enrollStudent.execute(enrollmentRequest).code).toEqual("2021EM3A0001")
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
        classroom: "A"
    }
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
        module: "3",
        classroom: "A"
    }
    const enrollmentRequest2:TypeEnrollmentRequest = {
        student: {
            name: "Mario Sérgio",
            cpf: "964.873.010-51",
            birthDate: "1970-05-09"
        },
        level: "EM",
        module: "3",
        classroom: "A"
    }
    enrollStudent.execute(enrollmentRequest1)
    expect(()=>enrollStudent.execute(enrollmentRequest2)).toThrow(new ErrorOverClassCapacity())
});