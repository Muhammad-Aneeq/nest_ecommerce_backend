import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ProductReview extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  userName: string;

  @Prop()
  reviewMessage: string;

  @Prop()
  reviewValue: number;
}

export const ProductReviewSchema = SchemaFactory.createForClass(ProductReview);
