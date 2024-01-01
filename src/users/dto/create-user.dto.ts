import {
  IsString,
  Length,
  IsNotEmpty,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @IsString()
  @Length(2, 200)
  about: string;

  avatar: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(2)
  @IsNotEmpty()
  password: string;
}
