import { Controller, Get, Post, Body, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Signupdto } from './Signup-dto/create-signup.dto';
import { tokenGenerator } from 'src/config/auth-helper';
import type { Response } from 'express';
import { Logindto } from './Login-dto/create-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @HttpCode(201)
  async Sinup(@Body() signupDto: Signupdto, @Res() res: Response) {

    const newUser = await this.authService.Signup(signupDto)

    const token = tokenGenerator({ username: signupDto.username, email: signupDto.email })

    res.cookie('token', token, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 48
    })

    res.json({
      newUser
    })

  }

  @Post('login')
  @HttpCode(200)
  async Login(@Body() loginDto: Logindto, @Res() res: Response) {

    const loginnedUser = await this.authService.Login(loginDto)

    const token = tokenGenerator({ username: loginDto.identifire, email: loginDto.identifire })

    res.cookie('token', token, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 48
    })

    res.json({
      loginnedUser
    })

  }
}