import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './repositories';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.ordersRepository.createOrder(createOrderDto);
  }

  async getOrders(): Promise<Order[]> {
    return await this.ordersRepository.getOrders();
  }

  async getOrder(id: string): Promise<Order> {
    return await this.ordersRepository.getOrderById(id);
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return await this.ordersRepository.updateOrder(id, updateOrderDto);
  }

  async deleteOrder(id: string): Promise<{ message: string }> {
    return await this.ordersRepository.deleteOrder(id);
  }
}
