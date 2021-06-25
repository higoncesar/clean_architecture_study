import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import EnrollmentRepository from '../../../domain/repositories/EnrollmentRepository'

export default class EnrollmentRepositoryMemorySingleton{
  static instance : EnrollmentRepository | undefined

  static getInstance():EnrollmentRepository{
    if(!EnrollmentRepositoryMemorySingleton.instance){
      EnrollmentRepositoryMemorySingleton.instance = new EnrollmentRepositoryMemory()
    }
    return EnrollmentRepositoryMemorySingleton.instance
  }

  static destroy(){
    EnrollmentRepositoryMemorySingleton.instance = undefined
  }
}