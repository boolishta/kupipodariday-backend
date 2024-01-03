import { PartialType } from '@nestjs/swagger';
import { CreateWishlistlistDto } from './create-wishlistlist.dto';

export class UpdateWishlistlistDto extends PartialType(CreateWishlistlistDto) {}
