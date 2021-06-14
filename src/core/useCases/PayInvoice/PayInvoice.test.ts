import ClassroomRepositoryMemory from '../../repositories/memory/ClassroomRepositoryMemory'
import EnrollmentRepositoryMemory from '../../repositories/memory/EnrollmentRepositoryMemory'
import LevelRepositoryMemory from '../../repositories/memory/LevelRepositoryMemory'
import ModuleRepositoryMemory from '../../repositories/memory/ModuleRepositoryMemory'
import EnrollStudent from '../EnrollStudent'
import PayInvoice from './index'
import GetEnrollment from '../GetEnrollment'
import PayInvoiceRequest from '../../modelRequest/PayInvoiceRequest'
import EnrollStudentRequest from '../../modelRequest/EnrollStudentRequest'

let payInvoice: PayInvoice
let enrollStudent: EnrollStudent
let getEnrollment : GetEnrollment

beforeEach(()=>{
  const enrollmentRepositoryMemory = new EnrollmentRepositoryMemory
  const levelRepositoryMemory = new LevelRepositoryMemory
  const moduleRepositoryMemory = new ModuleRepositoryMemory
  const classroomRepositoryMemory = new ClassroomRepositoryMemory
  enrollStudent = new EnrollStudent(levelRepositoryMemory, moduleRepositoryMemory, classroomRepositoryMemory, enrollmentRepositoryMemory)
  getEnrollment = new GetEnrollment(enrollmentRepositoryMemory)
  payInvoice = new PayInvoice(enrollmentRepositoryMemory)
})

it("Should pay enrollment invoice", function () {
  const enrollStudentRequest= new EnrollStudentRequest({
    studentName: "Maria Carolina Fonseca",
    studentCpf: "755.525.774-26",
    studentBirthDate: "1992-03-12",
    level: "EM",
    module: "3",
    classroom: "A",
    installments: 12
  })    
  enrollStudent.execute(enrollStudentRequest);
  const paymentInvoiceRequest = new PayInvoiceRequest({
    code: "2021EM3A0001",
    month: 1,
    year: 2021,
    amount: 1416.66,
    date: new Date()
  })
  payInvoice.execute(paymentInvoiceRequest)
  const enrollment = getEnrollment.execute(paymentInvoiceRequest.code)
  expect(enrollment.invoiceBalance).toBe(15583)
  expect(enrollment.student.name).toBe("Maria Carolina Fonseca")
  expect(enrollment.code.value).toBe("2021EM3A0001")

})