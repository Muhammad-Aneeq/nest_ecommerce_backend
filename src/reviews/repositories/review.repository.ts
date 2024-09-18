import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductReview } from '../schemas/review.schema';
import { CreateProductReviewDto } from '../dto/create-review.dto';
import { UpdateProductReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(ProductReview.name)
    private readonly productReviewModel: Model<ProductReview>,
  ) {}

  // Create a new product review
  async createReview(
    createProductReviewDto: CreateProductReviewDto,
  ): Promise<ProductReview> {
    const newReview = await this.productReviewModel.create(
      createProductReviewDto,
    );
    if (!newReview) throw new BadRequestException('400 review was not created');
    return newReview;
  }

  // Get all reviews
  async getReviews(): Promise<ProductReview[]> {
    return this.productReviewModel.find();
  }

  // Get a single review by ID
  async getReviewById(id: string): Promise<ProductReview> {
    const review = await this.productReviewModel.findById(id);
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  // Update a review by ID
  async updateReview(
    id: string,
    updateProductReviewDto: UpdateProductReviewDto,
  ): Promise<ProductReview> {
    const updatedReview = await this.productReviewModel.findByIdAndUpdate(
      id,
      updateProductReviewDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return updatedReview;
  }

  // Delete a review by ID
  async deleteReview(id: string): Promise<ProductReview> {
    const deletedReview = await this.productReviewModel.findByIdAndDelete(id);
    if (!deletedReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return deletedReview;
  }
}
