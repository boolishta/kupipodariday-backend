import { Wish } from './../wishes/entities/wish.entity';
import { WishesService } from './../wishes/wishes.service';
import { ErrorCode } from './../exceptions/error-codes';
import { ServerException } from './../exceptions/server.exception';
import { UsersService } from './../users/users.service';
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
    private readonly wishlistlistsRepository: Repository<Wishlistlist>,
    private readonly userService: UsersService,
    private readonly wishService: WishesService,
  ) {}

  async create(userId: number, createWishlistlistDto: CreateWishlistlistDto) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    const items: Wish[] = [];

    for (const wishId of createWishlistlistDto.itemsId) {
      const wish = await this.wishService.findWishById(wishId);
      if (!wish) {
        throw new ServerException(ErrorCode.WishNotFound);
      }
      items.push(wish);
    }

    const wishlistlists = await this.wishlistlistsRepository.create({
      user,
      items,
      image: createWishlistlistDto.image,
    });

    return wishlistlists;
  }

  findAll() {
    return this.wishlistlistsRepository.find();
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
