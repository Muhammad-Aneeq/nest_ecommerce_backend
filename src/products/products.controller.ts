import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/guards';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(200)
  async createProduct(@Body() createProductDto: CreateProductDto, @UploadedFile() image: Express.Multer.File) {
    return this.productsService.createProduct(createProductDto, image);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async getProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async getProduct(@Param('id') id: string): Promise<Product> {
    return await this.productsService.getProduct(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto,image);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    return await this.productsService.deleteProduct(id);
  }
}
