import Level from '../entities/Level';

export default interface LevelRepository{
  findByCode(code: string): Level ;
};
