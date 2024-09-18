import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  brand: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop()
  salePrice: number;

  @Prop()
  totalStock: number;

  @Prop()
  averageReview: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
