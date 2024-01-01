import { JwtGuard } from './../guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  profile(@Req() req) {
    const user = req.user;
    return this.userService.findByUsername(user.username);
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    return this.userService.updateById(user.id, updateUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findById(id);
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);
    return this.userService.removeById(id);
  }
}
