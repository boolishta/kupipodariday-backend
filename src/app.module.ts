import { Wish } from './wishes/entities/wish.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Offer } from './offers/entities/offer.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { HashModule } from './hash/hash.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'nest_project',
      entities: [User, Wish, Offer, Wishlist],
      synchronize: true,
      schema: 'nest_project',
    }),
    UsersModule,
    AuthModule,
    HashModule,
    WishesModule,
    OffersModule,
  ],
})
export class AppModule {}
