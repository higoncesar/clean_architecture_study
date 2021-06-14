import EnrollmentRepositoryMemory from "../../repositories/memory/EnrollmentRepositoryMemory";

export default class CancelEnrollment{
  enrollmentRepository: EnrollmentRepositoryMemory;

  constructor(enrollmentRepository: EnrollmentRepositoryMemory){
    this.enrollmentRepository = enrollmentRepository
  }

  execute(code: string){
    const enrollment = this.enrollmentRepository.getByCode(code)
    enrollment.cancel()
    return
  }
}