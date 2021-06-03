import Student,{Type as TypeStudent} from '../../entities/Student'
import {ErrorStudentDuplicated, ErrorBelowMinimumAge, ErrorOverClassCapacity} from '../../errors'
import LevelRepository from '../../repositories/LevelRepository'
import ModuleRepository from '../../repositories/ModuleRepository'
import ClassroomRepository from '../../repositories/ClassroomRepository'
import EnrollmentRepository from '../../repositories/EnrollmentRepository'
import Enrollment from '../../entities/Enrollment'
export interface TypeEnrollment{
  student: Student
  level: string,
  module: string,
  classroom: string
}
export interface TypeEnrollmentRequest{
  student: TypeStudent,
  level: string,
  module: string,
  classroom: string
}
export default class EnrollStudent{
  private levelRepository: LevelRepository
  private moduleRepository: ModuleRepository
  private classroomRepository: ClassroomRepository
  private enrollmentRepository: EnrollmentRepository

  constructor(repositoryLevel:LevelRepository, moduleRepository: ModuleRepository, classroomRepository: ClassroomRepository, enrollmentRepository: EnrollmentRepository){
      this.levelRepository = repositoryLevel
      this.moduleRepository = moduleRepository
      this.classroomRepository = classroomRepository
      this.enrollmentRepository = enrollmentRepository
  }

  execute(enrollmentRequest: TypeEnrollmentRequest){
    const student= new Student(enrollmentRequest.student)
    const isDuplicated= this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf)
    if(isDuplicated) throw(new ErrorStudentDuplicated())
    const level= this.levelRepository.findByCode(enrollmentRequest.level)
    const module = this.moduleRepository.findByCode(enrollmentRequest.module, level.code)
    if(module.minimumAge > student.getAge()) throw new ErrorBelowMinimumAge()
    const classroom= this.classroomRepository.findByCode(enrollmentRequest.classroom, module.code, level.code)
    const studentPerClass= this.enrollmentRepository.findAllByClass(level.code, module.code, classroom.code)
    if(studentPerClass >= classroom.capacity) throw new ErrorOverClassCapacity()
    
    const FULL_YEAR= new Date().getFullYear()
    const LEVEL= enrollmentRequest.level
    const MODULE= enrollmentRequest.module
    const CLASS= enrollmentRequest.classroom
    const SEQUENCE= String(this.enrollmentRepository.count()).padStart(4,"0")
    const code= `${FULL_YEAR}${LEVEL}${MODULE}${CLASS}${SEQUENCE}`
    const enrollment = new Enrollment(student, level.code, module.code, classroom.code, code)
    this.enrollmentRepository.save(enrollment)
    return enrollment
  }
}