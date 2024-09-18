import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './repositories';
import { APP_GUARD } from 'src/auth/constants';
import { AuthGuard } from 'src/auth/guards';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  providers: [
    OrdersService,
    OrdersRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
