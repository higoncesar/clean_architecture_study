import Enrollment from "../../entities/Enrollment";
import EnrollmentRepository from "../EnrollmentRepository";

class EnrollmentRepositoryMemory implements EnrollmentRepository{
  private enrollments: Enrollment[] = [];

  findByCpf(cpf: string){
    return this.enrollments.find(enrollment=> enrollment.student.cpf.value === cpf)
  }

  totalEnrollmentByClass(level: string, module: string, classroom: string){
    const enrollments = this.enrollments.filter(enrollment=> enrollment.level.code === level && enrollment.module.code ===module && enrollment.classroom.code === classroom).length
    return enrollments
  }

  count(){
    return this.enrollments.length + 1
  }

  save(enrollment: any){
    this.enrollments.push(enrollment)
    return enrollment
  }
}

export default EnrollmentRepositoryMemory