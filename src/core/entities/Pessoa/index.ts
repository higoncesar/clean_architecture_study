import Cpf from '../Cpf'
import {ErrorName} from '../../errors'

export interface Type{
  name:string
  cpf:string
}

export default class Pessoa{
  name:string
  cpf:Cpf

  constructor({name, cpf }:Type){
    if(!this.validateName(name)){
      throw(new ErrorName())
    }else{
      this.name=name
      this.cpf= new Cpf(cpf)
    }
  }

  validateName(name:string){
    return /^([a-zA-Z\u00C0-\u00FF ]+ )+([a-zA-Z\u00C0-\u00FF ])+$/.test(name)
  } 
}