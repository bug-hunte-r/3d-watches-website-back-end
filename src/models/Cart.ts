import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CartDocument = HydratedDocument<Cart>

@Schema()
export class Cart{
    @Prop({required: true, type: mongoose.Types.ObjectId, ref: 'User'})
    owner: mongoose.Types.ObjectId

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
    product: mongoose.Types.ObjectId

    @Prop({required: true, type: Number})
    count: number
}

export const CartSchema = SchemaFactory.createForClass(Cart)