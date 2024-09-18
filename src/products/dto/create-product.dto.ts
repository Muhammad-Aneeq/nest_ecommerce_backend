import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  brand: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  salePrice?: number;

  @Type(() => Number)
  @IsNumber()
  totalStock: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  averageReview?: number;
}
