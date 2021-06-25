import EnrollStudentInputData from '../domain/useCases/EnrollStudent/EnrollStudentInputData';
import EnrollStudent from '../domain/useCases/EnrollStudent';
import GetEnrollment from '../domain/useCases/GetEnrollment';
import RepositoryMemoryFactory from '../adapters/factories/RepositoryMemoryFactory';

let getEnrollment: GetEnrollment;
let enrollStudent: EnrollStudent;

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory();
  enrollStudent = new EnrollStudent(repositoryMemoryFactory);
  getEnrollment = new GetEnrollment(repositoryMemoryFactory);
});

it('Should throw error when get enrollment with invalid code', () => {
  const code = '2021EM1A0001';
  expect(() => getEnrollment.execute(code)).toThrow(
    new Error('Enrollment not found')
  );
});

it('Should get enrollment by code with invoice balance', () => {
  const enrollmentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '1992-03-12',
    level: 'EM',
    module: '3',
    classroom: 'A',
    installments: 12,
  });
  enrollStudent.execute(enrollmentRequest);
  const code = '2021EM3A0001';
  const enrollment = getEnrollment.execute(code);
  expect(enrollment.code.value).toBe('2021EM3A0001');
  expect(enrollment.student.name).toBe('Maria Carolina Fonseca');
  expect(enrollment.invoiceBalance).toBe(17000);
});
