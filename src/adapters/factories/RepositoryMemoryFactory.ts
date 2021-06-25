import RepositoryAbstractFactory from '../../domain/factories/RepositoryAbstractFactory';
import ClassroomRepositoryMemory from '../repositories/memory/ClassroomRepositoryMemory';
import EnrollmentRepositoryMemorySingleton from '../repositories/memory/EnrollmentRepositoryMemorySingleton';
import LevelRepositoryMemory from '../repositories/memory/LevelRepositoryMemory';
import ModuleRepositoryMemory from '../repositories/memory/ModuleRepositoryMemory';

export default class RepositoryMemoryFactory
  implements RepositoryAbstractFactory
{
  constructor() {
    EnrollmentRepositoryMemorySingleton.destroy();
  }

  createLevelRepository() {
    return new LevelRepositoryMemory();
  }

  createModuleRepository() {
    return new ModuleRepositoryMemory();
  }

  createClassroomRepository() {
    return new ClassroomRepositoryMemory();
  }

  createEnrollmentRepository() {
    return EnrollmentRepositoryMemorySingleton.getInstance();
  }
}
