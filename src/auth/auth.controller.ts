import { Controller, Get, Post, Body, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { tokenGenerator } from 'src/config/auth-helper';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @HttpCode(201)
  async Sinup(@Body() createUserDto: CreateAuthDto, @Res() res: Response) {

    const token = tokenGenerator({ username: createUserDto.username })

    res.cookie('token', token, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 48
    })

    const newUser = await this.authService.Signup(createUserDto)

    res.json({
      newUser
    })

  }

}
