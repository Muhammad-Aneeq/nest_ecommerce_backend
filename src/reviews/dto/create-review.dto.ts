import { IsNotEmpty, IsString, IsNumber, IsMongoId, Min, Max } from 'class-validator';

export class CreateProductReviewDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  reviewMessage: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  reviewValue: number; // Assuming reviewValue is a rating between 1 and 5
}
