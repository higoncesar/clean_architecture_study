interface IModule {
  level: string;
  code: string;
  description: string;
  minimumAge: number;
  price: number;
}

export default class Module {
  level: string;

  code: string;

  description: string;

  minimumAge: number;

  price: number;

  constructor({ level, code, description, minimumAge, price }: IModule) {
    this.level = level;
    this.code = code;
    this.description = description;
    this.minimumAge = minimumAge;
    this.price = price;
  }
}
