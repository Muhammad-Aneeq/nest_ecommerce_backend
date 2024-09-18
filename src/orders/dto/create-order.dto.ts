import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

class CartItemDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  productId: Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

class AddressDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  notes: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  user: Types.ObjectId;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  cartItems: CartItemDto[];

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  orderStatus: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  paymentStatus: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}
