interface Request{
  code: string,
  month: number,
  year: number,
  amount: number,
  date: Date
}
export default class PayInvoiceRequest{
  code: string
  month: number
  year: number
  amount: number
  date: Date
  
  constructor({code, month, year, amount, date}:Request){
    this.code = code
    this.month = month
    this.year = year
    this.amount = amount
    this.date = date
  }
}