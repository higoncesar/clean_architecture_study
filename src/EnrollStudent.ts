import validateCpf from './utils/validateCpf'

interface Enrollment {
  student: {
    name: string,
    cpf: string
  }
}

export default class EnrollStudent{
  private database:Enrollment[] = []

  execute(enrollment: Enrollment){
    const isValidName = /^([A-Za-z]+ )+([A-Za-z])+$/.test(enrollment.student.name)
    if(!isValidName){
      throw(new Error("Invalid student name"))
    }
    const isValidCpf = validateCpf(enrollment.student.cpf)
    if(!isValidCpf){
      throw(new Error("Invalid student cpf"))
    }
    const isDuplicated = this.database.find(item=>item.student.cpf===enrollment.student.cpf)
    if(isDuplicated){
      throw(new Error("Enrollment with duplicated student is not allowed"))
    }
    this.database.push(enrollment)
    return enrollment
  }
}