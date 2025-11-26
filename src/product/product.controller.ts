import { Controller, Get, Post, Body, Patch, Delete, HttpCode, Param, Put } from '@nestjs/common';
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

  @Get('all')
  @HttpCode(200)
  async getAllProducts() {
    const allProducts = await this.productService.getAllProducts()
    return allProducts
  }

  @Delete('delete/:id')
  @HttpCode(200)
  async deleteproduct(@Param('id') id: mongoose.Types.ObjectId) {
    const deletedProduct = await this.productService.deleteproduct(id)
    return deletedProduct
  }

  @Get('one/:id')
  @HttpCode(200)
  async getOneProduct(@Param('id') id: mongoose.Types.ObjectId) {
    const mainProduct = await this.productService.getOneProduct(id)
    return mainProduct
  }

  @Put('update/:id')
  @HttpCode(200)
  async updateProduct(@Param('id') id: mongoose.Types.ObjectId, @Body() updateProductDto: UpdateProductDto){

    const updatedProduct = await this.productService.updateProduct(id, updateProductDto)
    return updatedProduct
  }

}
