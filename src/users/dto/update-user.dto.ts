import { IsString, Length, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @IsString()
  @Length(2, 200)
  about: string;

  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
