import EnrollStudent from "./index";
import LevelRepositoryMemory from '../../repositories/memory/LevelRepositoryMemory'
import ModuleRepositoryMemory from '../../repositories/memory/ModuleRepositoryMemory'
import ClassroomRepositoryMemory from '../../repositories/memory/ClassroomRepositoryMemory'
import EnrollmentRepositoryMemory from '../../repositories/memory/EnrollmentRepositoryMemory'
import EnrollStudentRequest from "../../modelRequest/EnrollStudentRequest";

let enrollStudent: EnrollStudent

beforeEach(()=>{
    const levelRepository = new LevelRepositoryMemory()
    const moduleRepository = new ModuleRepositoryMemory()
    const classroomRepository = new ClassroomRepositoryMemory()
    const enrollmentRepository =  new EnrollmentRepositoryMemory()
    enrollStudent = new EnrollStudent(levelRepository, moduleRepository, classroomRepository, enrollmentRepository)
})

it("Should not enroll without valid student name", function () {
    const enrollmentRequest = new EnrollStudentRequest({        
        studentName: "Ana",
        studentCpf: "832.081.519-34",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    })     
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid name"))
});


it("Should not enroll without valid student cpf", function () {
    const enrollmentRequest = new EnrollStudentRequest({     
        studentName: "Ana Silva",
        studentCpf: "123.456.789-99",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    })
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid cpf"))
});

it("Should not enroll duplicated student", function () {
    const enrollmentRequest = new EnrollStudentRequest({     
        studentName: "Ana Silva",
        studentCpf: "832.081.519-34",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    })
    enrollStudent.execute(enrollmentRequest)
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Error student duplicated"))
});

it("Should generate enrollment code", function () {
    const enrollmentRequest = new EnrollStudentRequest({     
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    })
    expect(enrollStudent.execute(enrollmentRequest).code.value).toEqual("2021EM3A0001")
});

it("Should not enroll student below minimum age", function () {
    const enrollmentRequest = new EnrollStudentRequest({     
        studentName: "Ana Silva",
        studentCpf: "832.081.519-34",
        studentBirthDate: "2020-01-19",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    })
    expect(()=>enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Below minimum age"))
});

it("Should not enroll student over class capacity", function () {
    const enrollmentRequest1 = new EnrollStudentRequest({
        studentName: "Ana Silva",
        studentCpf: "832.081.519-34",
        studentBirthDate: "2000-01-19",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    })
    const enrollmentRequest2 = new EnrollStudentRequest({
        studentName: "Mario Sérgio",
        studentCpf: "964.873.010-51",
        studentBirthDate: "1970-05-09",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    })
    enrollStudent.execute(enrollmentRequest1)
    expect(()=>enrollStudent.execute(enrollmentRequest2)).toThrow(new Error("Over class capacity"))
});


it("Should not enroll after que end of the class", function () {
    const enrollmentRequest = new EnrollStudentRequest({     
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "B",
        installments: 12
    })
    expect(()=>enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class is already finished"))
});


it("Should not enroll after 25% of the start of the class", function () {
    const enrollmentRequest = new EnrollStudentRequest({     
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "3",
        classroom: "C",
        installments: 12
    })
    
    expect(()=>enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Class is already started"))
});


it("Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice", function () {
    const enrollmentRequest = new EnrollStudentRequest({     
        studentName: "Maria Carolina Fonseca",
        studentCpf: "755.525.774-26",
        studentBirthDate: "1992-03-12",
        level: "EM",
        module: "3",
        classroom: "A",
        installments: 12
    })    
    const enrollment = enrollStudent.execute(enrollmentRequest)
    expect(enrollment.invoices[0].amount).toBe(1416.66)
    expect(enrollment.invoices[11].amount).toBe(1416.73)
});

