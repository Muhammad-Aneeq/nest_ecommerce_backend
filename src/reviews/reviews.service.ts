import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './repositories';
import { ProductReview } from './schemas/review.schema';
import { CreateProductReviewDto } from './dto/create-review.dto';
import { UpdateProductReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
    constructor(private readonly reviewRepository: ReviewRepository) {}

    async createReview(createProductReviewDto: CreateProductReviewDto): Promise<ProductReview> {
      return this.reviewRepository.createReview(createProductReviewDto)
    }
  
    async getReviews(): Promise<ProductReview[]> {
      return this.reviewRepository.getReviews();
    }
  
    async getReviewById(id: string): Promise<ProductReview> {
      return this.reviewRepository.getReviewById(id);
    }
  
    async updateReview(id: string, updateProductReviewDto: UpdateProductReviewDto): Promise<ProductReview> {
      return this.reviewRepository.updateReview(id, updateProductReviewDto);
    }
  
    async deleteReview(id: string): Promise<ProductReview> {
      return this.reviewRepository.deleteReview(id);
    }
}
