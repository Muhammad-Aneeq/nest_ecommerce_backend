import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductRepository } from './repositories';
import { APP_GUARD } from 'src/auth/constants';
import { AuthGuard } from 'src/auth/guards';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    CloudinaryModule,
  ],
  providers: [
    ProductsService,
    ProductRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
