import RepositoryAbstractFactory from '../../factories/RepositoryAbstractFactory';
import EnrollmentRepository from '../../repositories/EnrollmentRepository';

export default class CancelEnrollment {
  enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(code: string) {
    const enrollment = this.enrollmentRepository.getByCode(code);
    enrollment.cancel();
  }
}
