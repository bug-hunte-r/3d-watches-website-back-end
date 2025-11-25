import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/User';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) { }

    async Signup (createUserDto: CreateAuthDto) {

        const isUserExist = await this.UserModel.findOne({username: createUserDto.username})

        if (isUserExist) {
            throw new ConflictException('This username is already exist')
        }
    }
}
