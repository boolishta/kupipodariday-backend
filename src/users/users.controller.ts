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
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { ERROR_MESSAGE } from 'src/errors';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.UserNotFound);
    }
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.UserNotFound);
    }
    return this.userService.removeById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.UserNotFound);
    }
    return this.userService.updateById(id, updateUserDto);
  }
}
