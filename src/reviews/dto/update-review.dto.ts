import { PartialType } from '@nestjs/mapped-types';
import { CreateProductReviewDto } from './create-review.dto';

export class UpdateProductReviewDto extends PartialType(CreateProductReviewDto) {}
