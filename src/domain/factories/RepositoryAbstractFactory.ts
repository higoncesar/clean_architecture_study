import ClassroomRepository from '../repositories/ClassroomRepository';
import EnrollmentRepository from '../repositories/EnrollmentRepository';
import LevelRepository from '../repositories/LevelRepository';
import ModuleRepository from '../repositories/ModuleRepository';

export default interface RepositoryAbstractFactory{
  createLevelRepository(): LevelRepository
  createModuleRepository(): ModuleRepository
  createClassroomRepository(): ClassroomRepository
  createEnrollmentRepository(): EnrollmentRepository
};
