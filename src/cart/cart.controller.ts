import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import type { Request } from 'express';
import mongoose from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('add/:id')
  @HttpCode(201)
  async addProductToCart(@Req() req: Request, @Param('id') id: mongoose.Types.ObjectId, @Body() createCartDto: CreateCartDto) {
    const setUserInfoForCart = await this.cartService.addProductToCart(req, id, createCartDto)
    return setUserInfoForCart
  }

  @Delete('delete/:id')
  @HttpCode(200)
  async deleteProductFromUsersCart(@Req() req: Request, @Param('id') id: mongoose.Types.ObjectId) {
    const deleteProductFromUsersCart = await this.cartService.deleteProductFromUsersCart(req, id)
    return deleteProductFromUsersCart
  }

}
