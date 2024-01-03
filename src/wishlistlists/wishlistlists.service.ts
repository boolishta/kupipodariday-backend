import { Wishlistlist } from './entities/wishlistlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateWishlistlistDto } from './dto/create-wishlistlist.dto';
import { UpdateWishlistlistDto } from './dto/update-wishlistlist.dto';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistlistsService {
  constructor(
    @InjectRepository(Wishlistlist)
    private readonly wishesRepository: Repository<Wishlistlist>,
  ) {}

  create(createWishlistlistDto: CreateWishlistlistDto) {
    return 'This action adds a new wishlistlist';
  }

  findAll() {
    return this.wishesRepository.find();
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
