import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateWishlistlistDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  image: string;
  itemsId: number[];
}
