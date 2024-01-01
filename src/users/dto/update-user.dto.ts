import { IsString, Length, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsString()
  @Length(0, 200)
  about: string;

  @IsString()
  avatar: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  password: string;
}
