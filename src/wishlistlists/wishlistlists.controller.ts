import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishlistlistsService } from './wishlistlists.service';
import { CreateWishlistlistDto } from './dto/create-wishlistlist.dto';
import { UpdateWishlistlistDto } from './dto/update-wishlistlist.dto';

@Controller('wishlistlists')
export class WishlistlistsController {
  constructor(private readonly wishlistlistsService: WishlistlistsService) {}

  @Post()
  create(@Body() createWishlistlistDto: CreateWishlistlistDto) {
    return this.wishlistlistsService.create(createWishlistlistDto);
  }

  @Get()
  findAll() {
    return this.wishlistlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistlistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishlistlistDto: UpdateWishlistlistDto) {
    return this.wishlistlistsService.update(+id, updateWishlistlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistlistsService.remove(+id);
  }
}
