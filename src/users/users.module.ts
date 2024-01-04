import { WishesModule } from './../wishes/wishes.module';
import { HashService } from './../hash/hash.service';
import { HashModule } from './../hash/hash.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HashModule,
    forwardRef(() => WishesModule),
  ],
  providers: [UsersService, HashService],
  controllers: [UsersController],
  exports: [UsersService, HashService],
})
export class UsersModule {}
