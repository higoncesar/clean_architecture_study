import Classroom from "../../../domain/entities/Classroom";
import ClassroomRepository from "../../../domain/repositories/ClassroomRepository";

class ClassroomRepositoryMemory implements ClassroomRepository{
  private classrooms: any[]

  constructor(){
    this.classrooms =  [
      new Classroom({
        level: "EM",
        module: "3",
        code: "A",
        capacity: 1,
        start_date: new Date("2021-06-01"),
        end_date: new Date("2021-12-15")
      }),
      new Classroom({
        level: "EM",
        module: "3",
        code: "B",
        capacity: 5,
        start_date: new Date("2021-05-01"),
        end_date: new Date("2021-05-30")
      }),
      new Classroom({
        level: "EM",
        module: "3",
        code: "C",
        capacity: 5,
        start_date:  new Date("2021-05-01"),
        end_date: new Date("2021-06-30")
      })
    ]
  }

  findByCode(code: string, module: string, level: string){
    const classroom = this.classrooms.find(classroom=> ((classroom.code === code) && (classroom.module == module) && (classroom.level === level)))
    if(!classroom) throw new Error("Class does not exist")
    return classroom
  }
}

export default ClassroomRepositoryMemory