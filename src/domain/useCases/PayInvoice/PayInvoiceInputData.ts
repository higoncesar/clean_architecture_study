interface Input{
  code: string,
  month: number,
  year: number,
  amount: number,
  date: Date
}
export default class PayInvoiceInputData{
  code: string
  month: number
  year: number
  amount: number
  date: Date
  
  constructor({code, month, year, amount, date}:Input){
    this.code = code
    this.month = month
    this.year = year
    this.amount = amount
    this.date = date
  }
}