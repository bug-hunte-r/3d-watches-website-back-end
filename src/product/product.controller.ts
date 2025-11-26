import { Controller, Get, Post, Body, Patch, Delete, HttpCode, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import mongoose, { ObjectId } from 'mongoose';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('add')
  @HttpCode(201)
  async addProduct(@Body() createProductDto: CreateProductDto) {
    const newProduct = await this.productService.addProduct(createProductDto)
    return newProduct
  }

  @Delete('delete/:id')
  @HttpCode(200)
  async deleteproduct(@Param('id') id: mongoose.Types.ObjectId) {
    const deletedProduct = await this.productService.deleteproduct(id)
    return deletedProduct
  }

  @Get(':id')
  @HttpCode(200)
  async getOneProduct(@Param('id') id: mongoose.Types.ObjectId) {
    const mainProduct = await this.productService.getOneProduct(id)
    return mainProduct
  }

}
