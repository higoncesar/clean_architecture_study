export interface ModuleType{
  level: string,
  code: string,
  description: string,
  minimumAge: number,
  price: number
}

export default interface ModuleRepository {
  findByCode:(code:string, level:string)=> ModuleType
}