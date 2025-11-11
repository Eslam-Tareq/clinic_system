import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as querystring from 'querystring';
import axios from 'axios';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { TokenService } from '../token/token.service';

@Injectable()
export class GoogleService {
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly REDIRECT_URI: string;
  private readonly SCOPES = ['email', 'profile'];
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
    private readonly tokenService: TokenService,
  ) {
    this.CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    this.CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    this.REDIRECT_URI = process.env.REDIRECT_URI;
  }
  googleAuth() {
    const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: this.REDIRECT_URI,
      client_id: this.CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: this.SCOPES.join(' '),
    };
    const url = `${authUrl}?${querystring.stringify(options)}`;
    return url;
  }
  async googleAuthCallBack(code: string, response: Response) {
    if (!code) {
      throw new UnauthorizedException('Authorization code not provided');
    }
    const tokens = await this.exchangeCodeForTokens(code);

    const { access_token, id_token } = tokens;

    // Verify ID token
    await this.verifyIdToken(id_token);

    // Get user profile information
    const userInfo = await this.getUserInfo(access_token);
    console.log('User Info:', userInfo);
    const userData = {
      first_name: userInfo.given_name,
      last_name: userInfo.family_name || '',
      email: userInfo.email,
      googleId: userInfo.sub,
    };
    const foundUser = await this.UserRepo.findOneBy({
      email: userData.email,
    });
    const frontendRedirect = process.env.FRONT_END_REDIRECT_AFTER_GOOGLE_AUTH;

    if (foundUser) {
      if (!foundUser.google_id) {
        throw new BadRequestException(
          'some thing went wrong, please try user regular login',
        );
      }

      const token = this.tokenService.generateJwtToken(foundUser);
      response.cookie('accessToken', token, {
        httpOnly: true,
        //sameSite: true,
      });

      response.redirect(`${frontendRedirect}?accessToken=${token}`);
    } else {
      const newUser = this.UserRepo.create({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        google_id: userData.googleId,
      });
      await this.UserRepo.save(newUser);
      const token = this.tokenService.generateJwtToken(newUser);
      response.cookie('accessToken', token, {
        httpOnly: true,
        // sameSite: true,
      });

      response.redirect(`${frontendRedirect}?accessToken=${token}`);
    }
  }
  async exchangeCodeForTokens(code: string) {
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        redirect_uri: this.REDIRECT_URI,
        grant_type: 'authorization_code',
      });

      return response.data;
    } catch (error) {
      throw new UnauthorizedException(
        `Failed to exchange code for tokens: ${error.message}`,
      );
    }
  }

  /**
   * Get user information from Google
   */
  async getUserInfo(accessToken: string) {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new UnauthorizedException(
        `Failed to fetch user info: ${error.message}`,
      );
    }
  }

  /**
   * Verify Google ID token
   */
  async verifyIdToken(idToken: string) {
    try {
      // For production, consider using google-auth-library for proper verification
      const response = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
      );

      // Verify that the token was issued to your app
      if (response.data.aud !== this.CLIENT_ID) {
        throw new UnauthorizedException(
          'Token was not issued for this application',
        );
      }

      return response.data;
    } catch (error) {
      throw new UnauthorizedException(
        `Failed to verify ID token: ${error.message}`,
      );
    }
  }
}
