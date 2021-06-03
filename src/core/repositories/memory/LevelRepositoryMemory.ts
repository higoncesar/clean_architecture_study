import LevelRepository, {LevelType} from '../LevelRepository'

export default class LevelRepositoryMemory implements LevelRepository{
  private levels: LevelType[]

  constructor(){
    this.levels = [
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
    ]
  }

  findByCode(code: string){
    const level =  this.levels.find(level=> level.code === code) 
    if(!level) throw new Error("Level does not exist")
    return level
  }
}