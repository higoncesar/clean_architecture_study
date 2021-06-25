import Classroom from "../entities/Classroom";

export default interface ClassroomRepository{
  findByCode: (code: string, model: string, level: string)=> Classroom 
}