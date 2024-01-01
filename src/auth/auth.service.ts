import { HashService } from './../hash/hash.service';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private hashService: HashService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    const { password, ...result } = user;

    return { access_token: this.jwtService.sign(payload), ...result };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;
    const matched = await this.hashService.verifyPassword(
      password,
      user.password,
    );
    if (matched) {
      /* Исключаем пароль из результата */
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
