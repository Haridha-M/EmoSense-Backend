import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, moodStatus, moodUserMapping } from './entities/user.entity';

  @Injectable()
export class UserService {
  constructor(){}
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(moodStatus)
  private moodStatusRepository: Repository<moodStatus>;

  @InjectRepository(moodUserMapping)
  private moodUserMappingRepository: Repository<moodUserMapping>;

  async login(data:any){
   const name=data.name
   const email=data.email
   const password=data.password
    let saveControl = await this.userRepository.createQueryBuilder('u')
    .select(`u.id,u.name,u.email,u.password`)
    .where('u.email =:email && u.password=:password',{email:email,password:password})
    .execute()
    return saveControl
  }
  async signUp(data:any){
     let saveControl = await this.userRepository.save(data)
     return saveControl
   }
  async getAllUser(id:number){
    let data = await this.userRepository.createQueryBuilder("u")
    .select(`u.id,u.name,u.email`)
    .where('u.id =:id',{id:id})
    .execute()
    return data;
  }
  async getAllMood(){
    let data = await this.moodStatusRepository.find()
    return data;
  }
  async addMood(data){
    let saveControl = await this.moodUserMappingRepository.save(data);
  }
  async getAllMoodStatus(id: number) {
    const statusUserId = id;
    
    const moodStatuses = [
        { id: 1, name: "Happy" },
        { id: 2, name: "Sad" },
        { id: 3, name: "Angry" },
        { id: 4, name: "Excited" },
        { id: 5, name: "Bored" },
        { id: 6, name: "Confused" },
        { id: 7, name: "Calm" },
        { id: 8, name: "Tired" },
        { id: 9, name: "Disappointed" }
    ];

    const counts = await Promise.all(moodStatuses.map(async (mood) => {
        const count = await this.moodUserMappingRepository.createQueryBuilder("mu")
            .leftJoin(moodStatus, "ms","mu.moodStatusId=ms.id") // Assuming "moodStatus" is the name of your related entity
            .select("ms.id, ms.mood, mu.id, mu.moodStatusId, mu.statusUserId")
            .where("mu.statusUserId = :statusUserId AND mu.moodStatusId = :moodStatusId AND mu.deletedAt IS NULL", { moodStatusId: mood.id, statusUserId:statusUserId })
            .getCount();
        return { [mood.name]: count };
    }));

    return Object.assign({}, ...counts);
}


async getCardList(id:number){
  const count = await this.moodUserMappingRepository.createQueryBuilder("mu")
  .leftJoin(moodStatus,"ms","mu.moodStatusId=ms.id")
  .select("ms.id,ms.mood,mu.id, mu.moodStatusId, mu.statusUserId,mu.createdAt as createdAt")
  .where('mu.statusUserId =:statusUserId',{statusUserId:id})
  .execute()
  return count
}
async addNotes(id:any,data){
  console.log(data,'hhhhhhh');

  let saveControl =await this.moodUserMappingRepository.update({moodStatusId:id, statusUserId: data.statusUserId }, { notes: data.notes });
  return saveControl
}
async getNotes(id:number){
  let data = await this.moodUserMappingRepository.createQueryBuilder("mu")
  .select(`mu.id,mu.notes`)
  .where('mu.id =:id',{id:id})
  .execute()
  return data;
}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
