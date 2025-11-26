import mongoose from "mongoose";

export class CreateCartDto {

    owner: mongoose.Types.ObjectId;

    product: mongoose.Types.ObjectId;

    count: Number
}
