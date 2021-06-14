import { request } from 'http'
import EnrollmentRepository from '../../repositories/EnrollmentRepository'
export default class GetEnrollment{
  enrollmentRepository: EnrollmentRepository
  constructor(enrollmentRepository: EnrollmentRepository){
    this.enrollmentRepository = enrollmentRepository
  }
  execute(code: string){
    const enrollment = this.enrollmentRepository.getByCode(code)
    return {...enrollment, invoiceBalance: enrollment.getInvoiceBalance()}
  }
}