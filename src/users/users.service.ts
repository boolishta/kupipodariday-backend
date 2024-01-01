import { HashService } from './../hash/hash.service';
import { ErrorCode } from './../exceptions/error-codes';
import { ServerException } from './../exceptions/server.exception';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  findAll(): Promise<User[]> {
    // TODO: возвращать без пароля
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hash = await this.hashService.hashPassword(createUserDto.password);
      const user = this.userRepository.create({
        username: createUserDto.username,
        email: createUserDto.email,
        about: createUserDto.about,
        avatar: createUserDto.about,
        password: hash,
      });
      const result = await this.userRepository.save(user);
      return result;
    } catch (e) {
      throw new ServerException(ErrorCode.UserAlreadyExists);
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    delete user.password;
    return user;
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  removeById(id: number) {
    return this.userRepository.delete({ id });
  }

  updateById(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }
}
