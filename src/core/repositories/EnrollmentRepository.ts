export default interface EnrollmentRepository{
  findByCpf: (cpf: string)=> any

  findAllByClass: (level: string, module: string, classroom: string) =>  number

  count: ()=> number

  save: (enrollment:any)=> any
}