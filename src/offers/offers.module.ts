import { WishesModule } from './../wishes/wishes.module';
import { UsersModule } from './../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), UsersModule, WishesModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
