import { WishesService } from './../wishes/wishes.service';
import { ErrorCode } from './../exceptions/error-codes';
import { ServerException } from './../exceptions/server.exception';
import { UsersService } from './../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly userService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  async create(userId: number, createOfferDto: CreateOfferDto) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }
    const item = await this.wishesService.findWishById(createOfferDto.itemId);
    if (!item) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    if (item.owner.id === userId) {
      throw new ServerException(ErrorCode.NotAllowedContributions);
    }
    if (createOfferDto.amount > item.price - item.raised) {
      throw new ServerException(ErrorCode.AmountCannotExceedValueGift);
    }
    await this.wishesService.updateWishRaised(
      createOfferDto.itemId,
      item.raised + createOfferDto.amount,
    );
    const offer = this.offersRepository.create({
      user,
      item,
      amount: createOfferDto.amount,
      hidden: createOfferDto.hidden,
    });
    const result = await this.offersRepository.save(offer);
    return result;
  }

  findAll() {
    return this.offersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
