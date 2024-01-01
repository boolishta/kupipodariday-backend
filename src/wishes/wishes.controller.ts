import { JwtGuard } from './../guards/jwt.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto) {
    const user = req.user;
    return this.wishesService.create(user.id, createWishDto);
  }

  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/last')
  getLastWish() {
    return this.wishesService.getLastWish();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/top')
  getFirstWish() {
    return this.wishesService.getFirstWish();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.update(+id, updateWishDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const user = req.user;
    return this.wishesService.remove(user.id, id);
  }
}
