import { ConflictException, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { Signupdto } from './Signup-dto/create-signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/User';
import mongoose, { Model } from 'mongoose';
import { hashPassHandler, verifyPassHandler, verifyTokenHandler } from 'src/config/auth-helper';
import { Logindto } from './Login-dto/create-login.dto';
import type { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) { }

    async Signup(signupDto: Signupdto) {

        const isUserNameExist = await this.UserModel.findOne({ $or: [{ username: signupDto.username }, { email: signupDto.email }] })

        if (isUserNameExist) {
            throw new ConflictException('This username or email is already exist')
        }

        const hashedPass = await hashPassHandler(signupDto.password)

        const allUsers = await this.UserModel.find({})

        const newUser = new this.UserModel({ ...signupDto, password: hashedPass, role: allUsers.length > 0 ? 'USER' : 'ADMIN' })
        await newUser.save()

        return { message: 'User Signuped successfully' }
    }

    async Login(loginDto: Logindto) {

        const isUserLogin = await this.UserModel.findOne({ $or: [{ username: loginDto.identifire }, { email: loginDto.identifire }] })

        if (!isUserLogin) {
            throw new NotFoundException('The username or emial is invalid')
        }

        const verifyPass = await verifyPassHandler(loginDto.password, isUserLogin.password)

        if (!verifyPass) {
            throw new NotFoundException('The password is invalid')
        }

        return { message: 'User Logged in Successfully' }
    }

    async getMe(@Req() req: Request) {

        const token = req.cookies?.['token']

        if (!token) {
            throw new UnauthorizedException('Token not found')
        }

        const verifiedToken = await verifyTokenHandler(token)

        if (!verifiedToken) {
            throw new UnauthorizedException('Token not valid')
        }

        const mainUser = await this.UserModel.findOne({ username: verifiedToken.username }).select('-password')

        return mainUser
    }

    async getAllUsers() {
        const allUsers = await this.UserModel.find({}).select('-password')
        return allUsers
    }

    async isUserAdmin(@Req() req: Request) {
        const token = req.cookies?.['token']

        if (!token) {
            throw new UnauthorizedException('Token not found')
        }

        const verifiedToken = await verifyTokenHandler(token)

        if (!verifiedToken) {
            throw new UnauthorizedException('Token not valid')
        }

        const userInfo = await this.UserModel.findOne({ username: verifiedToken.username }).select('-password')

        if (userInfo?.role != 'ADMIN') {
            throw new ConflictException('You can not send request for this api')
        }

        return {Message: 'Request sent'}
    }
}
