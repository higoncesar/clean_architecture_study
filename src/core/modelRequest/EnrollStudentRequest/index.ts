interface Request{
  studentName: string,
  studentCpf: string,
  studentBirthDate: string,
  level: string,
  module: string,
  classroom: string,
  installments: number
}

export default class EnrollStudentRequest{
  studentName: string
  studentCpf: string
  studentBirthDate: string
  level: string
  module: string
  classroom: string
  installments: number
  
  constructor(request:Request){
    this.studentName = request.studentName
    this.studentCpf = request.studentCpf
    this.studentBirthDate = request.studentBirthDate
    this.level = request.level
    this.module = request.module
    this.classroom = request.classroom
    this.installments = request.installments
  }
}