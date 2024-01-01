import { FindUserDto } from './dto/find-user.dto';
import { JwtGuard } from './../guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Body,
  Param,
  Patch,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
  profile(@Req() req) {
    const user = req.user;
    return this.userService.findByUsername(user.username);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/me')
  updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    return this.userService.updateById(user.id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('/me/wishes')
  wishes(@Req() req) {
    const user = req.user;
    return this.userService.getUserWishes(user.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':username')
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Get(':username/wishes')
  userWishes(@Param('username') username: string) {
    return this.userService.getUserWishesByUsername(username);
  }

  @Post('/find')
  findMany(@Body() findUserDto: FindUserDto) {
    return this.userService.findMany(findUserDto.query);
  }
}
