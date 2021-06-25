import Student from '../../entities/Student';
import LevelRepository from '../../repositories/LevelRepository';
import ModuleRepository from '../../repositories/ModuleRepository';
import ClassroomRepository from '../../repositories/ClassroomRepository';
import EnrollmentRepository from '../../repositories/EnrollmentRepository';
import Enrollment from '../../entities/Enrollment';
import EnrollStudentInputData from './EnrollStudentInputData';
import RepositoryAbstractFactory from '../../factories/RepositoryAbstractFactory';

export default class EnrollStudent {
  levelRepository: LevelRepository

  moduleRepository: ModuleRepository

  classroomRepository: ClassroomRepository

  enrollmentRepository: EnrollmentRepository

  constructor(repositoryFactory:RepositoryAbstractFactory) {
    this.levelRepository = repositoryFactory.createLevelRepository();
    this.moduleRepository = repositoryFactory.createModuleRepository();
    this.classroomRepository = repositoryFactory.createClassroomRepository();
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(input: EnrollStudentInputData) {
    const student = new Student({ name: input.studentName, birthDate: input.studentBirthDate, cpf: input.studentCpf });
    const isDuplicated = this.enrollmentRepository.findByCpf(input.studentCpf);
    if (isDuplicated) throw (new Error('Error student duplicated'));
    const level = this.levelRepository.findByCode(input.level);
    const module = this.moduleRepository.findByCode(input.module, level.code);
    const classroom = this.classroomRepository.findByCode(input.classroom, module.code, level.code);
    const studentsEnrolledInClass = this.enrollmentRepository.totalEnrollmentByClass(level.code, module.code, classroom.code);
    if (studentsEnrolledInClass >= classroom.capacity) throw new Error('Over class capacity');
    const issueDate = new Date();
    const sequence = String(this.enrollmentRepository.count()).padStart(4, '0');
    const enrollment = new Enrollment(student, level, module, classroom, issueDate, sequence);
    this.enrollmentRepository.save(enrollment);
    return enrollment;
  }
}
