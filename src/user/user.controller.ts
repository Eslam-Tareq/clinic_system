import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.gaurd';
import { Role } from '../common/guards/role.decorator';
import { UserRoles } from '../enums/user-role.enum';
import { ResponseDto } from '../common/filters/response.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserRoles.ADMIN])
  @Get()
  async getAllUsers() {
    try {
      const result = await this.userService.findAllUsers();
      return ResponseDto.ok(result);
    } catch (err) {
      throw err;
    }
  }
}
