import { JwtGuard } from './../guards/jwt.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import { WishlistlistsService } from './wishlistlists.service';
import { CreateWishlistlistDto } from './dto/create-wishlistlist.dto';
import { UpdateWishlistlistDto } from './dto/update-wishlistlist.dto';

@Controller('wishlistlists')
export class WishlistlistsController {
  constructor(private readonly wishlistlistsService: WishlistlistsService) {}

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createWishlistlistDto: CreateWishlistlistDto, @Req() req) {
    const user = req.user;
    return this.wishlistlistsService.create(user.id, createWishlistlistDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.wishlistlistsService.findAll();
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const user = req.user;
    return this.wishlistlistsService.findOneByUserIdWithRelations(user.id, id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWishlistlistDto: UpdateWishlistlistDto,
    @Req() req,
  ) {
    const user = req.user;
    return this.wishlistlistsService.update(user.id, id, updateWishlistlistDto);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const user = req.user;
    return this.wishlistlistsService.remove(user.id, id);
  }
}
