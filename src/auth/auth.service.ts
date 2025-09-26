import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dtos/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { TokenService } from '../token/token.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await this.hashingPassword(signUpDto.password);
    const newUser = new User();
    newUser.first_name = signUpDto.first_name;
    newUser.last_name = signUpDto.last_name;
    newUser.email = signUpDto.email;
    newUser.password = hashedPassword;
    newUser.gender = signUpDto.gender;
    newUser.phone = signUpDto.phone;
    const savedUser = await this.UserRepo.save(newUser);
    const token = await this.tokenService.generateJwtToken(savedUser);
    return {
      user: savedUser,
      accessToken: token,
    };
  }
  async login(loginDto: LoginDto) {
    const user = await this.UserRepo.findOneBy({ email: loginDto.email });
    if (!user) {
      throw new BadRequestException('email or password is incorrect');
    }
    const isCorrectPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new BadRequestException('email or password is incorrect');
    }
    const token = await this.tokenService.generateJwtToken(user);
    return {
      user,
      accessToken: token,
    };
  }
  async hashingPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  }
}
