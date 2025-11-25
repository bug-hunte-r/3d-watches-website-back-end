import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/User';
import { Model } from 'mongoose';
import { hashPassHandler } from 'src/config/auth-helper';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) { }

    async Signup(createUserDto: CreateAuthDto) {

        const isUserNameExist = await this.UserModel.findOne({ $or: [{ username: createUserDto.username }, { email: createUserDto.email }] })

        if (isUserNameExist) {
            throw new ConflictException('This username or email is already exist')
        }

        const hashedPass = await hashPassHandler(createUserDto.password)

        const allUsers = await this.UserModel.find({})

        const newUser = new this.UserModel({ ...createUserDto, password: hashedPass, role: allUsers.length > 0 ? 'USER' : 'ADMIN' })
        await newUser.save()

        return { message: 'User Signuped successfully' }
    }
}
