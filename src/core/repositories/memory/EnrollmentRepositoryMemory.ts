import EnrollmentRepository from "../EnrollmentRepository";

class EnrollmentRepositoryMemory implements EnrollmentRepository{
  private enrollments: any[] = [];

  findByCpf(cpf: string){
    return this.enrollments.find(enrollment=> enrollment.student.cpf.value === cpf)
  }

  findAllByClass(level: string, module: string, classroom: string){
    const enrollments = this.enrollments.filter(enrollment=> enrollment.level === level && enrollment.module ===module && enrollment.classroom === classroom).length
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