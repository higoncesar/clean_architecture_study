import RepositoryAbstractFactory from '../../factories/RepositoryAbstractFactory';
import EnrollmentRepository from '../../repositories/EnrollmentRepository';
import PayInvoiceInputData from './PayInvoiceInputData';

export default class PayInvoice {
  enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(input: PayInvoiceInputData) {
    const enrollment = this.enrollmentRepository.getByCode(input.code);
    enrollment.payInvoice(input.date, input.month, input.year, input.amount);
    return enrollment;
  }
}
