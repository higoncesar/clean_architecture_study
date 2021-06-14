import EnrollStudentRequest from '../../modelRequest/EnrollStudentRequest'
import ClassroomRepositoryMemory from '../../repositories/memory/ClassroomRepositoryMemory'
import EnrollmentRepositoryMemory from '../../repositories/memory/EnrollmentRepositoryMemory'
import LevelRepositoryMemory from '../../repositories/memory/LevelRepositoryMemory'
import ModuleRepositoryMemory from '../../repositories/memory/ModuleRepositoryMemory'
import EnrollStudent from '../EnrollStudent'
import GetEnrollment from './index'

let getEnrollment: GetEnrollment
let enrollStudent: EnrollStudent

beforeEach(()=>{
  const enrollmentRepositoryMemory = new EnrollmentRepositoryMemory
  const levelRepositoryMemory = new LevelRepositoryMemory
  const moduleRepositoryMemory = new ModuleRepositoryMemory
  const classroomRepositoryMemory = new ClassroomRepositoryMemory
  enrollStudent = new EnrollStudent(levelRepositoryMemory, moduleRepositoryMemory, classroomRepositoryMemory, enrollmentRepositoryMemory)
  getEnrollment = new GetEnrollment(enrollmentRepositoryMemory)
})

it("Should throw error when get enrollment with invalid code", function () {
  const code = "2021EM1A0001"
  expect(()=>getEnrollment.execute(code)).toThrow(new Error("Enrollment not found"))
})

it("Should get enrollment by code with invoice balance", function () {
  const enrollmentRequest= new EnrollStudentRequest({
    studentName: "Maria Carolina Fonseca",
    studentCpf: "755.525.774-26",
    studentBirthDate: "1992-03-12",
    level: "EM",
    module: "3",
    classroom: "A",
    installments: 12
  })    
  enrollStudent.execute(enrollmentRequest)
  const code= "2021EM3A0001"
  const enrollment = getEnrollment.execute(code)
  expect(enrollment.code.value).toBe("2021EM3A0001")
  expect(enrollment.student.name).toBe("Maria Carolina Fonseca")
  expect(enrollment.invoiceBalance).toBe(17000)
});
