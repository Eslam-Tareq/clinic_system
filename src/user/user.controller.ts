import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.gaurd';
import { Role } from 'src/common/guards/role.decorator';
import { UserRoles } from 'src/enums/user-role.enum';
import { ResponseDto } from 'src/common/filters/response.dto';

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
