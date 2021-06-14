import EnrollStudentRequest from '../../modelRequest/EnrollStudentRequest'
import ClassroomRepositoryMemory from '../../repositories/memory/ClassroomRepositoryMemory'
import EnrollmentRepositoryMemory from '../../repositories/memory/EnrollmentRepositoryMemory'
import LevelRepositoryMemory from '../../repositories/memory/LevelRepositoryMemory'
import ModuleRepositoryMemory from '../../repositories/memory/ModuleRepositoryMemory'
import EnrollStudent from '../EnrollStudent'
import CancelEnrollment from './'

let cancelEnrollment: CancelEnrollment
let enrollStudent: EnrollStudent

beforeEach(()=>{
  const enrollmentRepository = new EnrollmentRepositoryMemory()
  const levelRepository = new LevelRepositoryMemory()
  const moduleRepository = new ModuleRepositoryMemory()
  const classroomRepository = new ClassroomRepositoryMemory()
  cancelEnrollment = new CancelEnrollment(enrollmentRepository)
  enrollStudent = new EnrollStudent(levelRepository,moduleRepository, classroomRepository, enrollmentRepository)
})

it("Should throw a error when try cancel enrollment with invalid code", function(){
  expect(()=>cancelEnrollment.execute("invalid code")).toThrow(new Error('Enrollment not found'))
})

it("Should cancel enrollment", function(){
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
  cancelEnrollment.execute(enrollment.code.value)
  expect(enrollment.status).toBe("cancelled")
})