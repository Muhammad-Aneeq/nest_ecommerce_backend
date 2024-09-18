import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(200)
  async createProduct(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  async getOrders(): Promise<Order[]> {
    return await this.ordersService.getOrders();
  }

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<Order> {
    return await this.ordersService.getOrder(id);
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return await this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<{ message: string }> {
    return await this.ordersService.deleteOrder(id);
  }
}
