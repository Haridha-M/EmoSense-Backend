import { Controller, Get, Post, Body, Patch, Param, Delete, Res,HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response,Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  async login(@Res() res: Response, @Param('token') tokenId: string,  @Body() data: any,) {
      let vData = await this.userService.login(data);
      res.status(HttpStatus.OK).json({
        success: true,
      });

  }

  @Get('getAllUser/:id')
  async getAllUser(@Res() res: Response, @Param('id') id: number,  @Body() data: any,) {
      let vData = await this.userService.getAllUser(id);
      res.status(HttpStatus.OK).json({
        success: true,
        data:vData
      });

  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
