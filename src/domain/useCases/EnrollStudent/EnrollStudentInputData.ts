interface Input {
  studentName: string,
  studentCpf: string,
  studentBirthDate: string,
  level: string,
  module: string,
  classroom: string,
  installments: number
}

export default class EnrollStudentInputData {
  studentName: string

  studentCpf: string

  studentBirthDate: string

  level: string

  module: string

  classroom: string

  installments: number

  constructor(input: Input) {
    this.studentName = input.studentName;
    this.studentCpf = input.studentCpf;
    this.studentBirthDate = input.studentBirthDate;
    this.level = input.level;
    this.module = input.module;
    this.classroom = input.classroom;
    this.installments = input.installments;
  }
}
