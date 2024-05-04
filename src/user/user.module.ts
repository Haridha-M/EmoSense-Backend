import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, moodStatus, moodUserMapping } from './entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports :[TypeOrmModule.forFeature([
    User,moodStatus,moodUserMapping
      ])]
})
export class UserModule {}
