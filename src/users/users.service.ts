import { Wish } from './../wishes/entities/wish.entity';
import { HashService } from './../hash/hash.service';
import { ErrorCode } from './../exceptions/error-codes';
import { ServerException } from './../exceptions/server.exception';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hash = await this.hashService.hashPassword(createUserDto.password);
      const user = this.userRepository.create({
        username: createUserDto.username,
        email: createUserDto.email,
        about: createUserDto.about,
        avatar: createUserDto.avatar,
        password: hash,
      });
      const result = await this.userRepository.save(user);
      return result;
    } catch (e) {
      throw new ServerException(ErrorCode.UserAlreadyExists);
    }
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    // TODO: обновлять только те данные которые пришли с фронта
    const hash = await this.hashService.hashPassword(updateUserDto.password);
    await this.userRepository.update(
      { id },
      {
        ...updateUserDto,
        password: hash,
      },
    );
    return this.findById(id);
  }

  async getUserWishes(id: number): Promise<Wish[]> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        wishes: true,
      },
    });
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }
    return user.wishes;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    return user;
  }

  async getUserWishesByUsername(username: string): Promise<Wish[]> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: {
        wishes: true,
      },
    });
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }
    return user.wishes;
  }

  findMany(query: string): Promise<User[]> {
    return this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: ILike(`%${query}%`) }],
    });
  }
}
