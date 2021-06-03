import ClassroomRepository, {ClassroomType} from "../ClassroomRepository";

class ClassroomRepositoryMemory implements ClassroomRepository{
  private classrooms: ClassroomType[]

  constructor(){
    this.classrooms =  [
      {
          level: "EM",
          module: "3",
          code: "A",
          capacity:1
      }
    ]
  }

  findByCode(code: string, module: string, level: string){
    const classroom = this.classrooms.find(classroom=> ((classroom.code === code) && (classroom.module == module) && (classroom.level === level)))
    if(!classroom) throw new Error("Class does not exist")
    return classroom
  }
}

export default ClassroomRepositoryMemory