import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateProductReviewDto } from './dto/create-review.dto';
import { UpdateProductReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createProductReviewDto: CreateProductReviewDto) {
    return this.reviewService.createReview(createProductReviewDto);
  }

  @Get()
  async getReviews() {
    return this.reviewService.getReviews();
  }

  @Get(':id')
  async getReviewById(@Param('id') id: string) {
    return this.reviewService.getReviewById(id);
  }

  @Put(':id')
  async updateReview(
    @Param('id') id: string,
    @Body() updateProductReviewDto: UpdateProductReviewDto,
  ) {
    return this.reviewService.updateReview(id, updateProductReviewDto);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
