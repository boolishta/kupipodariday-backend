import { Injectable } from '@nestjs/common';
import { CreateWishlistlistDto } from './dto/create-wishlistlist.dto';
import { UpdateWishlistlistDto } from './dto/update-wishlistlist.dto';

@Injectable()
export class WishlistlistsService {
  create(createWishlistlistDto: CreateWishlistlistDto) {
    return 'This action adds a new wishlistlist';
  }

  findAll() {
    return `This action returns all wishlistlists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlistlist`;
  }

  update(id: number, updateWishlistlistDto: UpdateWishlistlistDto) {
    return `This action updates a #${id} wishlistlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlistlist`;
  }
}
