import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product{

    @Prop({required: true, type: String})
    title: string

    @Prop({required: true, type: String})
    desc: string

    @Prop({required: true, type: Number})
    price: number

    @Prop({required: true, type: Number})
    count: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)