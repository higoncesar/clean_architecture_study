import Student from '../../entities/Student'
import {ErrorStudentDuplicated,  ErrorOverClassCapacity} from '../../errors'
import LevelRepository from '../../repositories/LevelRepository'
import ModuleRepository from '../../repositories/ModuleRepository'
import ClassroomRepository from '../../repositories/ClassroomRepository'
import EnrollmentRepository from '../../repositories/EnrollmentRepository'
import Enrollment from '../../entities/Enrollment'

export default class EnrollStudent{
  levelRepository: LevelRepository
  moduleRepository: ModuleRepository
  classroomRepository: ClassroomRepository
  enrollmentRepository: EnrollmentRepository

  constructor(repositoryLevel:LevelRepository, moduleRepository: ModuleRepository, classroomRepository: ClassroomRepository, enrollmentRepository: EnrollmentRepository){
      this.levelRepository = repositoryLevel
      this.moduleRepository = moduleRepository
      this.classroomRepository = classroomRepository
      this.enrollmentRepository = enrollmentRepository
  }

  execute(enrollmentRequest: any){
    const student= new Student(enrollmentRequest.student)
    const isDuplicated= this.enrollmentRepository.findByCpf(enrollmentRequest.student.cpf)
    if(isDuplicated) throw(new ErrorStudentDuplicated())
    const level= this.levelRepository.findByCode(enrollmentRequest.level)
    const module = this.moduleRepository.findByCode(enrollmentRequest.module, level.code)
    const classroom= this.classroomRepository.findByCode(enrollmentRequest.classroom, module.code, level.code)
    const studentsEnrolledInClass= this.enrollmentRepository.totalEnrollmentByClass(level.code, module.code, classroom.code)
    if(studentsEnrolledInClass >= classroom.capacity) throw new ErrorOverClassCapacity()
    const issueDate = new Date()
    const sequence= String(this.enrollmentRepository.count()).padStart(4,"0")
    const enrollment = new Enrollment(student, level, module, classroom, issueDate, sequence)
    this.enrollmentRepository.save(enrollment)
    return enrollment
  }
}