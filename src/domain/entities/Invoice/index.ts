import InvoiceEvent from '../../events/InvoiceEvent';

export default class Invoice {
  code: string;

  month: number;

  year: number;

  amount: number;

  events: InvoiceEvent[] = [];

  constructor(code: string, month: number, year: number, amount: number) {
    this.code = code;
    this.month = month;
    this.year = year;
    this.amount = amount;
  }

  addEvent(invoiceEvent: InvoiceEvent) {
    this.events.push(invoiceEvent);
  }

  getBalance() {
    return this.events.reduce((total, event) => {
      total -= event.amount;
      return total;
    }, this.amount);
  }
}
