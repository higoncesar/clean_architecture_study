import PayInvoiceRequest from "../../modelRequest/PayInvoiceRequest";
import EnrollmentRepository from "../../repositories/EnrollmentRepository";

export default class PayInvoice{
  enrollmentRepository: EnrollmentRepository

  constructor(enrollmentRepository: EnrollmentRepository){
    this.enrollmentRepository= enrollmentRepository
  }

  execute(request: PayInvoiceRequest){
    const enrollment = this.enrollmentRepository.getByCode(request.code)
    enrollment.payInvoice(request.date, request.month, request.year, request.amount)
    return enrollment
  }
}