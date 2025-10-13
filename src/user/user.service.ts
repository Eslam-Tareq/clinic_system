import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from '../auth/dtos/sign-up.dto';
import { UserRoles } from '../enums/user-role.enum';
import { Response } from 'express';
import { UpdateCurrentUserDto } from './dtos/update-current-user.dto';

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
  async getCurrentUser(id: number) {
    return await this.UserRepo.findOne({ where: { id } });
  }
  async logout(res: Response) {
    res.clearCookie('accessToken');
  }
  async updateCurrentUser(
    userId: number,
    updateCurrentUserDto: UpdateCurrentUserDto,
  ) {
    const currentUser = await this.UserRepo.findOne({ where: { id: userId } });
    const { first_name, last_name, gender, email, phone } =
      updateCurrentUserDto;
    currentUser.first_name = first_name ? first_name : currentUser.first_name;
    currentUser.last_name = last_name ? last_name : currentUser.last_name;
    currentUser.email = email ? email : currentUser.email;
    currentUser.phone = phone ? phone : currentUser.phone;
    currentUser.gender = gender ? gender : currentUser.gender;
    const updatedUser = await this.UserRepo.save(currentUser);
    return updatedUser;
  }
  async deleteCurrentUser(userId: number) {
    const user = await this.UserRepo.findOne({ where: { id: userId } });
    await this.UserRepo.remove(user);
  }
}
