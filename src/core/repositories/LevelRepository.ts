export interface LevelType{
  code: string,
  description: string
}

export default interface LevelRepository{
  findByCode(code: string): LevelType;
}