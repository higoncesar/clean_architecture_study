import EnrollStudent from '../EnrollStudent';
import PayInvoice from './index';
import GetEnrollment from '../GetEnrollment';
import PayInvoiceInputData from './PayInvoiceInputData';
import EnrollStudentInputData from '../EnrollStudent/EnrollStudentInputData';
import RepositoryMemoryFactory from '../../../adapters/factories/RepositoryMemoryFactory';

let payInvoice: PayInvoice;
let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory();
  enrollStudent = new EnrollStudent(repositoryMemoryFactory);
  getEnrollment = new GetEnrollment(repositoryMemoryFactory);
  payInvoice = new PayInvoice(repositoryMemoryFactory);
});

it('Should pay enrollment invoice', () => {
  const enrollStudentRequest = new EnrollStudentInputData({
    studentName: 'Maria Carolina Fonseca',
    studentCpf: '755.525.774-26',
    studentBirthDate: '1992-03-12',
    level: 'EM',
    module: '3',
    classroom: 'A',
    installments: 12,
  });
  enrollStudent.execute(enrollStudentRequest);
  const paymentInvoiceRequest = new PayInvoiceInputData({
    code: '2021EM3A0001',
    month: 1,
    year: 2021,
    amount: 1416.66,
    date: new Date(),
  });
  payInvoice.execute(paymentInvoiceRequest);
  const enrollment = getEnrollment.execute(paymentInvoiceRequest.code);
  expect(enrollment.invoiceBalance).toBe(15583);
  expect(enrollment.student.name).toBe('Maria Carolina Fonseca');
  expect(enrollment.code.value).toBe('2021EM3A0001');
});
