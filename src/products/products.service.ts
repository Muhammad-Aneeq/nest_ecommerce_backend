import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
  ) {
    let imageUrl = null;

    if (image) {
      imageUrl =await this.uploadProductImage(image);
    }

    const productData = imageUrl
      ? { ...createProductDto, image: imageUrl }
      : createProductDto;
    return await this.productRepository.createProduct(productData);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.getProducts();
  }

  async getProduct(id: string): Promise<Product> {
    return await this.productRepository.getProductById(id);
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    image: Express.Multer.File,
  ): Promise<Product> {
    let imageUrl = null;

    if (image) {
      imageUrl = await this.uploadProductImage(image);
    }

    const updateProductData = imageUrl
      ? { ...updateProductDto, image: imageUrl }
      : updateProductDto;
    return await this.productRepository.updateProduct(id, updateProductData);
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    return await this.productRepository.deleteProduct(id);
  }

  private async uploadProductImage(image: Express.Multer.File) {
    const fileName = image?.originalname;
    const uploadResult = await this.cloudinaryService.uploadFile(
      image,
      'products',
      fileName,
    );
    return uploadResult?.url || null;
  }
}
