import { Wishlistlist } from './entities/wishlistlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WishlistlistsService } from './wishlistlists.service';
import { WishlistlistsController } from './wishlistlists.controller';

@Module({
  controllers: [WishlistlistsController],
  providers: [WishlistlistsService],
  imports: [TypeOrmModule.forFeature([Wishlistlist])],
})
export class WishlistlistsModule {}
