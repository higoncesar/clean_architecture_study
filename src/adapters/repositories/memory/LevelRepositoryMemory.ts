import Level from '../../../domain/entities/Level';
import LevelRepository from '../../../domain/repositories/LevelRepository';

export default class LevelRepositoryMemory implements LevelRepository {
  private levels: Level[]

  constructor() {
    this.levels = [
      new Level({
        code: 'EF1',
        description: 'Ensino Fundamental I',
      }),
      new Level({
        code: 'EF2',
        description: 'Ensino Fundamental II',
      }),
      new Level({
        code: 'EM',
        description: 'Ensino Médio',
      }),
    ];
  }

  findByCode(code: string) {
    const level = this.levels.find((level) => level.code === code);
    if (!level) throw new Error('Level does not exist');
    return level;
  }
}
