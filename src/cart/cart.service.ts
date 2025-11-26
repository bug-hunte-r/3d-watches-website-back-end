import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthService } from 'src/auth/auth.service';
import type { Request } from 'express';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from 'src/models/Cart';
import { ProductService } from 'src/product/product.service';
import { Product, ProductDocument } from 'src/models/Product';

@Injectable()
export class CartService {
    constructor(private readonly authService: AuthService, @InjectModel(Cart.name) private CartModel: Model<CartDocument>) { }

    async addProductToCart(@Req() req: Request, id: mongoose.Schema.Types.ObjectId, createCartDto: CreateCartDto) {
        try {

            const setUserInfoForCart = await this.authService.getMe(req)
            const setProductIdForCart = id

            await this.CartModel.create({ ...createCartDto, owner: setUserInfoForCart?._id, product: setProductIdForCart })
            return { Message: 'Product added to cart' }

        } catch (error) {
            if (error.code === 11000) {
                
                const userId = await this.authService.getMe(req)
                const setProductIdForCart = id

                await this.CartModel.findOneAndUpdate({ product: setProductIdForCart, owner: userId?._id }, {
                    $inc: { count: + 1 }
                })

                return {Message: 'Product count is update'}
            }
        }
    }

    async deleteProductFromUsersCart(@Req() req: Request, id: mongoose.Types.ObjectId) {

        const userId = await this.authService.getMe(req)

        const mainProductToDelete = await this.CartModel.findByIdAndDelete({ _id: id, owner: userId?._id })

        if (!mainProductToDelete) {
            throw new NotFoundException('Product not found')
        }

        return { Message: 'Product removed from cart' }

    }

    async getUsersProductsInTheCart(@Req() req: Request, id: mongoose.Types.ObjectId) {

        const userId = await this.authService.getMe(req)

        const usersProductInTheCart = await this.CartModel.find({ owner: userId?._id })

        if (!usersProductInTheCart.length) {
            throw new NotFoundException('Your cart is empty')
        }

        return { Data: usersProductInTheCart }
    }
}
