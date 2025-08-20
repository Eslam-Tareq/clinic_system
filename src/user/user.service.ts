import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
  ) {}
  async createNewUser(signUpDto: SignUpDto) {}
}
