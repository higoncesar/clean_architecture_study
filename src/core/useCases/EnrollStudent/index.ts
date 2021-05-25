import Student,{Type as TypeStudent} from '../../entities/Student'
import {ErrorStudentDuplicated} from '../../errors'

export interface TypeEnrollment {
  student: Student
}

export interface TypeEnrollmentRequest{
  student: TypeStudent
}

export default class EnrollStudent{
  private database:TypeEnrollment[] = []

  execute(enrollmentRequest: TypeEnrollmentRequest){
    const student = new Student(enrollmentRequest.student)
    const isDuplicated = this.database.find(enrollment=>enrollment.student.cpf.value === enrollmentRequest.student.cpf)
    if(isDuplicated) throw(new ErrorStudentDuplicated())
    const enrollment = {
      student
    }
    this.database.push(enrollment)
    return enrollment
  }
}