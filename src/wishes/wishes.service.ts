import { ErrorCode } from './../exceptions/error-codes';
import { ServerException } from './../exceptions/server.exception';
import { UsersService } from './../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    private readonly userService: UsersService,
  ) {}

  async create(ownerId: number, createWishDto: CreateWishDto) {
    const owner = await this.userService.findById(ownerId);
    if (!owner) {
      throw new ServerException(ErrorCode.UserNotFound);
    }
    const wish = this.wishesRepository.create({ owner, ...createWishDto });
    const result = await this.wishesRepository.save(wish);
    return result;
  }

  // TODO: offers relations

  async findWishById(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: {
        owner: true,
      },
    });
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    return wish;
  }

  findWishByUserId(userId: number, wishId: number) {
    return this.wishesRepository.findOne({
      where: { id: wishId, owner: { id: userId } },
    });
  }

  async update(userId: number, id: number, updateWishDto: UpdateWishDto) {
    const wish = await this.findWishByUserId(userId, id);
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    await this.wishesRepository.update({ id }, updateWishDto);
    const updatedWish = await this.findWishById(wish.id);
    return updatedWish;
  }

  async remove(userId: number, id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id, owner: { id: userId } },
    });

    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }

    await this.wishesRepository.delete(wish.id);
  }

  async getLastWish() {
    const wish = await this.wishesRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        owner: true,
      },
      take: 1,
    });
    return wish;
  }

  async getFirstWish() {
    const wish = await this.wishesRepository.find({
      order: {
        createdAt: 'ASC',
      },
      relations: {
        owner: true,
      },
      take: 1,
    });
    return wish;
  }
}
