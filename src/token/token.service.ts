import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(user: User) {
    const payload = { id: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }
  validateJwtToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw e;
    }
  }
}
