import Student from '../../entities/Student'
import LevelRepository from '../../repositories/LevelRepository'
import ModuleRepository from '../../repositories/ModuleRepository'
import ClassroomRepository from '../../repositories/ClassroomRepository'
import EnrollmentRepository from '../../repositories/EnrollmentRepository'
import Enrollment from '../../entities/Enrollment'
import EnrollStudentRequest from '../../modelRequest/EnrollStudentRequest'

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

  execute(request: EnrollStudentRequest){
    const student= new Student({name:request.studentName, birthDate: request.studentBirthDate, cpf: request.studentCpf})
    const isDuplicated= this.enrollmentRepository.findByCpf(request.studentCpf)
    if(isDuplicated) throw(new Error("Error student duplicated"))
    const level= this.levelRepository.findByCode(request.level)
    const module = this.moduleRepository.findByCode(request.module, level.code)
    const classroom= this.classroomRepository.findByCode(request.classroom, module.code, level.code)
    const studentsEnrolledInClass= this.enrollmentRepository.totalEnrollmentByClass(level.code, module.code, classroom.code)
    if(studentsEnrolledInClass >= classroom.capacity) throw new Error("Over class capacity")
    const issueDate = new Date()
    const sequence= String(this.enrollmentRepository.count()).padStart(4,"0")
    const enrollment = new Enrollment(student, level, module, classroom, issueDate, sequence)
    this.enrollmentRepository.save(enrollment)
    return enrollment
  }
}