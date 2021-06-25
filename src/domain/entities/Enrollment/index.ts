import Classroom from '../Classroom';
import EnrollmentCode from '../EnrollmentCode';
import Invoice from '../Invoice';
import Level from '../Level';
import Module from '../Module';
import Student from '../Student';
import InvoiceEvent from '../../events/InvoiceEvent';

export default class Enrollment {
    student: Student

    level: Level

    module: Module

    classroom: Classroom

    code: EnrollmentCode

    issueDate: Date

    sequence: string

    installments: number

    invoices: Invoice[]

    status: string

    constructor(student: Student, level: Level, module: Module, classroom: Classroom, issueDate: Date, sequence: string, installments: number = 12) {
      if (module.minimumAge > student.getAge()) throw new Error('Below minimum age');
      if (classroom.isFinished(issueDate)) throw new Error('Class is already finished');
      if (classroom.getPercentageProgress(issueDate) > 25) throw new Error('Class is already started');
      this.student = student;
      this.level = level;
      this.module = module;
      this.classroom = classroom;
      this.issueDate = issueDate;
      this.sequence = sequence;
      this.code = new EnrollmentCode(level.code, module.code, classroom.code, issueDate, sequence);
      this.installments = installments;
      this.invoices = [];
      this.generateInvoices();
      this.status = 'actived';
    }

    generateInvoices() {
      const installmentAmount = Math.trunc((this.module.price / this.installments) * 100) / 100;
      for (let i = 1; i <= this.installments; i++) {
        this.invoices.push(new Invoice(this.code.value, i, this.issueDate.getFullYear(), installmentAmount));
      }
      const total = this.invoices.reduce((total, invoice) => {
        total += invoice.amount;
        return total;
      }, 0);
      const rest = Math.trunc((this.module.price - total) * 100) / 100;
      this.invoices[this.installments - 1].amount = installmentAmount + rest;
    }

    getInvoiceBalance() {
      let total = 0;
      this.invoices.forEach((invoice) => {
        total += invoice.getBalance();
      });
      return Math.round(total);
    }

    getInvoice(month:number, year:number) {
      const invoice = this.invoices.find((invoice) => invoice.month === month && invoice.year === year);
      if (!invoice) throw new Error('Invalid invoice');
      return invoice;
    }

    payInvoice(date:Date, month:number, year:number, amount:number) {
      const invoice = this.getInvoice(month, year);
      invoice.addEvent(new InvoiceEvent({ type: 'payment', date, amount }));
    }

    cancel() {
      this.status = 'cancelled';
    }
}
