import { ErrorCode } from './../exceptions/error-codes';
import { ServerException } from './../exceptions/server.exception';
import { UsersService } from './../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly dataSource: DataSource,
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

  findUserWishesWithRelations(
    userId: number,
    relations: { owner?: boolean; offers?: boolean } = {},
  ) {
    return this.wishesRepository.find({
      where: { owner: { id: userId } },
      relations: {
        owner: relations?.owner || false,
        offers: relations?.offers || false,
      },
    });
  }

  async update(userId: number, id: number, updateWishDto: UpdateWishDto) {
    const wish = await this.findWishByUserId(userId, id);
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    if (updateWishDto.price && wish.raised > 0) {
      throw new ServerException(ErrorCode.CannotChangeWishError);
    }
    await this.wishesRepository.update({ id }, updateWishDto);
    const updatedWish = await this.findWishById(wish.id);
    return updatedWish;
  }

  async updateWishRaised(id: number, raised: number) {
    const wish = await this.findWishById(id);
    wish.raised = raised;
    this.wishesRepository.save(wish);
  }

  async remove(userId: number, id: number) {
    const wish = await this.findWishByUserId(userId, id);
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    await this.wishesRepository.delete(wish.id);
    return wish;
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

  findUserWishByLink(userId: number, link: string) {
    return this.wishesRepository.findOne({
      where: { link, owner: { id: userId } },
    });
  }

  async copyWish(userId: number, id: number) {
    const owner = await this.userService.findById(userId);
    if (!owner) {
      throw new ServerException(ErrorCode.UserNotFound);
    }
    const wish = await this.wishesRepository.findOne({
      where: { id },
    });
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    const userWish = await this.findUserWishByLink(userId, wish.link);
    if (userWish) {
      throw new ServerException(ErrorCode.WishCopyError);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newWish = new Wish();
      newWish.name = wish.name;
      newWish.link = wish.link;
      newWish.image = wish.image;
      newWish.price = wish.price;
      newWish.description = wish.description;
      newWish.owner = owner;

      wish.copied = (wish.copied || 0) + 1;

      await this.wishesRepository.save([wish, newWish]);
      return newWish;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
