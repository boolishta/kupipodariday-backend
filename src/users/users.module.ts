import { HashService } from './../hash/hash.service';
import { HashModule } from './../hash/hash.module';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashModule],
  providers: [UsersService, UsersRepository, HashService],
  controllers: [UsersController],
  exports: [UsersService, HashService],
})
export class UsersModule {}
