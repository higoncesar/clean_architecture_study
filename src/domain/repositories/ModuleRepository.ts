import Module from '../entities/Module';

export default interface ModuleRepository {
  findByCode:(code:string, level:string)=> Module
};
