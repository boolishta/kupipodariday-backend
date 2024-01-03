import { UsersModule } from './../users/users.module';
import { Wishlistlist } from './entities/wishlistlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WishlistlistsService } from './wishlistlists.service';
import { WishlistlistsController } from './wishlistlists.controller';
import { WishesModule } from 'src/wishes/wishes.module';

@Module({
  controllers: [WishlistlistsController],
  providers: [WishlistlistsService],
  imports: [
    TypeOrmModule.forFeature([Wishlistlist]),
    UsersModule,
    WishesModule,
  ],
})
export class WishlistlistsModule {}
