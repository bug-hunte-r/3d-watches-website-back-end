import { Controller, Get, Post, Body, Patch, Delete, HttpCode, Param, Put, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import type { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly authService: AuthService) { }

  @Post('add')
  @HttpCode(201)
  async addProduct(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    await this.authService.isUserAdmin(req)
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
  async deleteproduct(@Param('id') id: mongoose.Types.ObjectId, @Req() req: Request) {
    await this.authService.isUserAdmin(req)
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
  async updateProduct(@Param('id') id: mongoose.Types.ObjectId, @Body() updateProductDto: UpdateProductDto, @Req() req: Request){
    await this.authService.isUserAdmin(req)
    const updatedProduct = await this.productService.updateProduct(id, updateProductDto)
    return updatedProduct
  }

}
