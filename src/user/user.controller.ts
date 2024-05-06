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
        data:vData
      });

  }

  @Post('signUp')
  async signUp(@Res() res: Response, @Param('token') tokenId: string,  @Body() data: any,) {
      let vData = await this.userService.signUp(data);
      res.status(HttpStatus.OK).json({
        success: true,
        data:vData
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
  @Get('getAllMood')
  async getAllMood(@Res() res: Response, @Param('id') id: number,  @Body() data: any,) {
      let vData = await this.userService.getAllMood();
      res.status(HttpStatus.OK).json({
        success: true,
        data:vData
      });

  }
  @Post('addMood')
  async addMood(@Res() res: Response, @Param('token') tokenId: string,  @Body() data: any,) {
      let vData = await this.userService.addMood(data);
      res.status(HttpStatus.OK).json({
        success: true,
      });

  }
  @Get('getAllMoodStatus/:id')
  async getAllMoodStatus(@Res() res: Response, @Param('id') id: number,  @Body() data: any,) {
      let vData = await this.userService.getAllMoodStatus(id);
      res.status(HttpStatus.OK).json({
        success: true,
        data:vData
      });

  }
  @Get('getCardList')
  async getCardList(@Res() res: Response, @Param('id') id: number,  @Body() data: any,) {
      let vData = await this.userService.getCardList();
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
