export default class EnrollmentCode {
  value: string

  constructor(level:string, module:string, classroom: string, date: Date, sequence: string) {
    this.value = `${date.getFullYear()}${level}${module}${classroom}${sequence}`;
  }
}
