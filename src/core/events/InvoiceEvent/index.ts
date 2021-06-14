export default class InvoiceEvent {
  type: string;
  date: Date;
  amount: number;

  constructor ({type, date, amount }: { type: string, date: Date, amount: number }) {
      this.type = type;
      this.date = date;
      this.amount = amount;
  }
}