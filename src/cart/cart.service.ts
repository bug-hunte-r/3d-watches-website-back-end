import { Injectable, Req } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthService } from 'src/auth/auth.service';
import type { Request } from 'express';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from 'src/models/Cart';

@Injectable()
export class CartService {
    constructor(private readonly authService: AuthService, @InjectModel(Cart.name) private CartModel: Model<CartDocument>) { }

    async addProductToCart(@Req() req: Request, id: mongoose.Types.ObjectId, createCartDto: CreateCartDto) {

        const setUserInfoForCart = await this.authService.getMe(req)

        const setProductForCart = id

        await this.CartModel.create({ ...createCartDto, owner: setUserInfoForCart, product: setProductForCart })

        return { Message: 'Product added to cart' }
    }
}
