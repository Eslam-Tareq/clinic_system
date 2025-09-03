import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let token: string;
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      token = request.headers.authorization.split(' ')[1];
    } else {
      token = request.cookies?.accessToken;
    }
    if (!token) {
      return false;
    }
    let decoded: any;
    try {
      decoded = this.tokenService.validateJwtToken(token);
    } catch (err) {
      return false;
    }
    const user = await this.userService.findById(decoded!.id);
    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
