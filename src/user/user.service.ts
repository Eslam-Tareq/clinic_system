import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { UserRoles } from 'src/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
  ) {}
  async createNewUser(signUpDto: SignUpDto) {}
  async findById(id: number) {
    return this.UserRepo.findOne({ where: { id } });
  }
  async findAllUsers() {
    return this.UserRepo.find({ where: { role: UserRoles.USER } });
  }
}
