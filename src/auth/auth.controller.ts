// auth.controller.ts

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
// --- Swagger Imports Added ---
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { GoogleService } from '../google/google.service';

// --- Swagger Tag for Grouping ---
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) {}

  @Post('signup') // --- Swagger Documentation for SignUp ---
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description:
      'User registered successfully. Returns user data and sets accessToken in an httpOnly cookie.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation errors.' })
  @ApiBody({ type: SignUpDto })
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
  @HttpCode(HttpStatus.OK) // --- Swagger Documentation for Login ---
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({
    status: 200,
    description:
      'User logged in successfully. Returns user data and sets accessToken in an httpOnly cookie.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid credentials.',
  })
  @ApiBody({ type: LoginDto })
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
  @ApiOperation({ summary: 'Initiate Google OAuth login' }) // --- Updated Response for Redirect ---
  @ApiResponse({
    status: 302,
    description: 'Redirects to the Google OAuth consent screen.',
  })
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
  @ApiQuery({
    name: 'code',
    required: true,
    type: String,
    description: 'The authorization code from Google.',
  }) // --- Improved Response Descriptions ---
  @ApiResponse({
    status: 200,
    description:
      'Google OAuth successful. Sets an accessToken cookie and returns user data.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid authorization code.',
  })
  async googleAuthCallback(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.googleService.googleAuthCallBack(code, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK) // --- Swagger Documentation for Logout ---
  @ApiOperation({ summary: 'Log out the user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully clears the accessToken cookie.',
  })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    return ResponseDto.ok(null, 'User logged out successfully');
  }
}
