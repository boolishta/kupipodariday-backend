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

  findAll() {
    return `This action returns all wishes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wish`;
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return `This action updates a #${id} wish`;
  }

  remove(id: number) {
    return `This action removes a #${id} wish`;
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
}
