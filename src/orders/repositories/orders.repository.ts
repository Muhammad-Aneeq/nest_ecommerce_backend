import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderModel.create(createOrderDto);
    if (!order) throw new BadRequestException('400 order was not created');
    return order;
  }

  async getOrders(): Promise<Order[]> {
    const orders = await this.orderModel.find();
    return orders;
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException('order was not found');
    return order;
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      updateOrderDto,
      { new: true, runValidators: true },
    );
    if (!updatedOrder) throw new BadRequestException('order was not updated');
    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<{ message: string }> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id);
    if (!deletedOrder)
      throw new BadRequestException('400 order was not deleted');
    return { message: 'order deleted successfully!' };
  }
}
