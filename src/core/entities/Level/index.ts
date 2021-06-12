interface ILevel{
  code: string
  description: string
}
export default class Level{
  code: string;
  description: string;

  constructor({code, description}:ILevel){
    this.code = code;
    this.description = description
  }
}