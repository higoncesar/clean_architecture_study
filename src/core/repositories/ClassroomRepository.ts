export interface ClassroomType{
  level: string,
  module: string,
  code: string,
  capacity: number
}

export default interface ClassroomRepository{
  findByCode: (code: string, model: string, level: string)=> ClassroomType
}