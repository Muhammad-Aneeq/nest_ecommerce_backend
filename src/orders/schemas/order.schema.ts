import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Address, AddressSchema } from './address.schema';

@Schema({ timestamps: true })
export class Order  extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop([
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
      price: { type: Number },
    },
  ])
  cartItems: {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop()
  orderStatus: string;

  @Prop()
  paymentMethod: string;

  @Prop()
  paymentStatus: string;

  @Prop()
  totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
