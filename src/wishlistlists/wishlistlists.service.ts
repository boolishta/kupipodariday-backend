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
    const owner = await this.userService.findById(userId);
    if (!owner) {
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
      owner,
      items,
      image: createWishlistlistDto.image,
      name: createWishlistlistDto.name,
    });
    return this.wishlistlistsRepository.save(wishlistlists);
  }

  findAll() {
    return this.wishlistlistsRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  findOneWithRelations(id: number) {
    return this.wishlistlistsRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  async findOneByUserId(userId: number, id: number) {
    const wishlist = await this.wishlistlistsRepository.findOne({
      where: {
        id,
        owner: {
          id: userId,
        },
      },
      relations: {
        owner: true,
        items: true,
      },
    });
    if (!wishlist) {
      throw new ServerException(ErrorCode.WishlistNotFound);
    }
    return wishlist;
  }

  update(id: number, updateWishlistlistDto: UpdateWishlistlistDto) {
    return `This action updates a #${id} wishlistlist`;
  }

  async remove(userId: number, id: number) {
    const wishlist = await this.findOneByUserId(userId, id);
    await this.wishlistlistsRepository.delete(wishlist.id);
    return wishlist;
  }
}
