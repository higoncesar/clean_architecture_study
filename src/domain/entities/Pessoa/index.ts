import Cpf from '../Cpf';

interface Type{
  name:string
  cpf:string,
  birthDate: string
}
export default class Pessoa {
  name:string

  cpf:Cpf

  birthDate: Date

  constructor({ name, cpf, birthDate }:Type) {
    if (!this.validateName(name)) {
      throw (new Error('Invalid name'));
    } else {
      this.name = name;
      this.cpf = new Cpf(cpf);
      this.birthDate = new Date(birthDate);
    }
  }

  validateName(name:string) {
    return /^([a-zA-Z\u00C0-\u00FF ]+ )+([a-zA-Z\u00C0-\u00FF ])+$/.test(name);
  }

  getAge() {
    const today = new Date();
    return Math.floor(Math.ceil(Math.abs(this.birthDate.getTime() - today.getTime()) / (1000 * 3600 * 24)) / 365.25);
  }
}
