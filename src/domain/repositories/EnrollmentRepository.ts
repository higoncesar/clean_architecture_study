import Enrollment from '../entities/Enrollment';

export default interface EnrollmentRepository {
  getByCode: (code: string) => Enrollment;

  findByCpf: (cpf: string) => Enrollment | undefined;

  totalEnrollmentByClass: (
    level: string,
    module: string,
    classroom: string
  ) => number;

  count: () => number;

  save: (enrollment: Enrollment) => Enrollment;
}
