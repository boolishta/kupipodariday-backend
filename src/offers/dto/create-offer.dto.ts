import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateOfferDto {
  @Min(1)
  @IsNotEmpty()
  amount: number;

  hidden: boolean;

  @IsNotEmpty()
  @IsInt()
  itemId: number;
}
