import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductReview, ProductReviewSchema } from './schemas/review.schema';
import { APP_GUARD } from 'src/auth/constants';
import { AuthGuard } from 'src/auth/guards';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductReview.name,
        schema: ProductReviewSchema,
      },
    ]),
  ],
  providers: [
    ReviewsService,
    ReviewRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
