import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { ResponseDto } from '../common/filters/response.dto';
import { Response } from 'express';
import { LoginDto } from './dtos/login.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GoogleService } from '../google/google.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) {}

  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const result = await this.authService.signUp(signUpDto);
      res.cookie('accessToken', result.accessToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        sameSite: 'strict',
      });
      return ResponseDto.created(result, 'User registered successfully');
    } catch (error) {
      throw error;
    }
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const result = await this.authService.login(loginDto);
      res.cookie('accessToken', result.accessToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        sameSite: 'strict',
      });
      return ResponseDto.ok(result, 'User logged in successfully');
    } catch (error) {
      throw error;
    }
  }
  @Get('google')
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({ status: 200, description: 'Google login URL returned' })
  async googleAuth(@Res({ passthrough: true }) response: Response) {
    try {
      const authUri = this.googleService.googleAuth();
      response.redirect(authUri);
    } catch (error) {
      throw error;
    }
  }

  @Get('google/callback')
  @ApiOperation({ summary: 'Handle Google OAuth callback' })
  @ApiQuery({ name: 'code', required: true, type: String })
  @ApiResponse({ status: 200, description: 'OAuth successful' })
  async googleAuthCallback(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.googleService.googleAuthCallBack(code, res);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    return ResponseDto.ok(null, 'User logged out successfully');
  }
}
