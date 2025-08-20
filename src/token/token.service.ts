import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(user: User) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
