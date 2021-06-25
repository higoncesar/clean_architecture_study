interface IClassroom{
  level: string
  module: string
  code: string
  capacity: number,
  start_date: Date,
  end_date: Date
}

export default class Classroom{
  level: string
  module: string
  code: string
  capacity: number
  start_date: Date
  end_date: Date
  
  constructor({level, module, code, capacity, start_date, end_date}: IClassroom){
    this.level = level
    this.module = module
    this.code = code
    this.capacity = capacity
    this.start_date = start_date
    this.end_date = end_date
  }

  isFinished(currentDate:Date){
    return currentDate.getTime() > this.end_date.getTime()
  }

  getPercentageProgress(currentDate: Date){
    return Math.round(((currentDate.getTime() - this.start_date.getTime()) * 100) / (this.end_date.getTime() - this.start_date.getTime()))
  }
}