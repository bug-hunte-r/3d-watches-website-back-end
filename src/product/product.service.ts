import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/models/Product';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>) { }

  async addProduct(createProductDto: CreateProductDto) {

    const isProductExist = await this.ProductModel.findOne({ title: createProductDto?.title })

    if (isProductExist) {
      throw new ConflictException('This product is already been selected')
    }

    await this.ProductModel.create({ ...createProductDto })

    return { Message: 'Product added successfully' }
  }

  async getAllProducts() {

    const allProducts = await this.ProductModel.find()

    if (!allProducts.length) {
      throw new NotFoundException('Dont have product yet')
    }

    return allProducts
  }

  async deleteproduct(id: mongoose.Types.ObjectId) {
    const deletedProduct = await this.ProductModel.findByIdAndDelete(id)

    if (!deletedProduct) {
      throw new NotFoundException('Product not found')
    }

    return { Message: 'Product Deleted Successfully' }
  }

  async getOneProduct(id: mongoose.Types.ObjectId) {
    const mainProduct = await this.ProductModel.findOne({ _id: id })

    if (!mainProduct) {
      throw new NotFoundException('Product not found')
    }

    return mainProduct
  }

}
