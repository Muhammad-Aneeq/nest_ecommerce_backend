import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productModel.create(createProductDto);
    if (!product) throw new BadRequestException('400 product was not created');
    return product;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('product was not found');
    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true, runValidators: true },
    );
    if (!updatedProduct)
      throw new BadRequestException('product was not updated');
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct)
      throw new BadRequestException('400 product was not deleted');
    return { message: 'product deleted successfully!' };
  }
}
