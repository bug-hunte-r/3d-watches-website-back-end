import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from 'src/models/Cart';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [AuthModule, MongooseModule.forFeature([{name: Cart.name, schema: CartSchema}])]
})
export class CartModule {}
