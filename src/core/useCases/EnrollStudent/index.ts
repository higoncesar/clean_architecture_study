import Student,{Type as TypeStudent} from '../../entities/Student'
import {ErrorStudentDuplicated, ErrorBelowMinimumAge, ErrorOverClassCapacity} from '../../errors'
export interface TypeEnrollment {
  student: Student
  level: string,
  module: string,
  class: string
}
export interface TypeEnrollmentRequest{
  student: TypeStudent,
  level: string,
  module: string,
  class: string
}
export default class EnrollStudent{
  private database:TypeEnrollment[] = []
  private data = {
    levels: [
        {
            code: "EF1",
            description: "Ensino Fundamental I"
        },
        {
            code: "EF2",
            description: "Ensino Fundamental II"
        },
        {
            code: "EM",
            description: "Ensino Médio"
        }
    ],
    modules: [
        {
            level: "EF1",
            code: "1",
            description: "1o Ano",
            minimumAge: 6,
            price: 15000
        },
        {
            level: "EF1",
            code: "2",
            description: "2o Ano",
            minimumAge: 7,
            price: 15000
        },
        {
            level: "EF1",
            code: "3",
            description: "3o Ano",
            minimumAge: 8,
            price: 15000
        },
        {
            level: "EF1",
            code: "4",
            description: "4o Ano",
            minimumAge: 9,
            price: 15000
        },
        {
            level: "EF1",
            code: "5",
            description: "5o Ano",
            minimumAge: 10,
            price: 15000
        },
        {
            level: "EF2",
            code: "6",
            description: "6o Ano",
            minimumAge: 11,
            price: 14000
        },
        {
            level: "EF2",
            code: "7",
            description: "7o Ano",
            minimumAge: 12,
            price: 14000
        },
        {
            level: "EF2",
            code: "8",
            description: "8o Ano",
            minimumAge: 13,
            price: 14000
        },
        {
            level: "EF2",
            code: "9",
            description: "9o Ano",
            minimumAge: 14,
            price: 14000
        },
        {
            level: "EM",
            code: "1",
            description: "1o Ano",
            minimumAge: 15,
            price: 17000
        },
        {
            level: "EM",
            code: "2",
            description: "2o Ano",
            minimumAge: 16,
            price: 17000
        },
        {
            level: "EM",
            code: "3",
            description: "3o Ano",
            minimumAge: 17,
            price: 17000
        }
    ],
    classes: [
        {
            level: "EM",
            module: "3",
            code: "A",
            capacity:2
        }
    ]
  };

  execute(enrollmentRequest: TypeEnrollmentRequest){
    const student = new Student(enrollmentRequest.student)
    const isDuplicated = this.database.find(enrollment=>enrollment.student.cpf.value === enrollmentRequest.student.cpf)
    if(isDuplicated) throw(new ErrorStudentDuplicated())

    const module=this.data.modules.find(module=>module.code===enrollmentRequest.module)
    if(!module)throw new Error("Module does not exist")
    if(module.minimumAge>student.getAge()) throw new ErrorBelowMinimumAge()

    const classe = this.data.classes.find(classe=>classe.code===enrollmentRequest.class)
    if(!classe) throw new Error("Class does not exist")
    const currentQuantity = this.database.filter(enroll=>enroll.class===classe.code).length
    if(classe.capacity<=currentQuantity) throw new ErrorOverClassCapacity()
    
    const FULL_YEAR= new Date().getFullYear()
    const LEVEL= enrollmentRequest.level
    const MODULE= enrollmentRequest.module
    const CLASS= enrollmentRequest.class
    const SEQUENCE = String(this.database.length+1).padStart(4,"0")
    const code=`${FULL_YEAR}${LEVEL}${MODULE}${CLASS}${SEQUENCE}`
    const enrollment = {
      student,
      level: enrollmentRequest.level,
      module: enrollmentRequest.module,
      class:enrollmentRequest.class,
      code
    }
    this.database.push(enrollment)
    return enrollment
  }
}