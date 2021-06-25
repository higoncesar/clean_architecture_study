import EnrollStudent from '../EnrollStudent';
import CancelEnrollment from '.';
import RepositoryMemoryFactory from '../../../adapters/factories/RepositoryMemoryFactory';
import GetEnrollment from '../GetEnrollment';
import EnrollStudentInputData from '../EnrollStudent/EnrollStudentInputData';

let cancelEnrollment: CancelEnrollment;
let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory();
  cancelEnrollment = new CancelEnrollment(repositoryMemoryFactory);
  getEnrollment = new GetEnrollment(repositoryMemoryFactory);
  enrollStudent = new EnrollStudent(repositoryMemoryFactory);
});

it('Should throw a error when try cancel enrollment with invalid code', () => {
  expect(() => cancelEnrollment.execute('invalid code')).toThrow(new Error('Enrollment not found'));
});

it('Should cancel enrollment', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Ana Maria',
    studentCpf: '864.464.227-84',
    studentBirthDate: '2002-10-10',
    level: 'EM',
    module: '3',
    classroom: 'A',
    installments: 12,
  });
  const code = '2021EM3A0001';
  enrollStudent.execute(enrollmentRequest);
  cancelEnrollment.execute(code);
  const enrollment = getEnrollment.execute(code);
  expect(enrollment.status).toBe('cancelled');
});
