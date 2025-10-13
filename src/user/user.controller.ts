import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.gaurd';
import { Role } from '../common/guards/role.decorator';
import { UserRoles } from '../enums/user-role.enum';
import { ResponseDto } from '../common/filters/response.dto';
import { Request, Response } from 'express';
import { UpdateCurrentUserDto } from './dtos/update-current-user.dto';

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
  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: Request) {
    try {
      const result = await this.userService.getCurrentUser(req.user.id);
      return ResponseDto.ok(result);
    } catch (error) {
      throw error;
    }
  }
  @Put('update-me')
  @UseGuards(AuthGuard)
  async updateMe(
    @Req() req: Request,
    @Body() updateCurrentUserDto: UpdateCurrentUserDto,
  ) {
    try {
      const result = await this.userService.updateCurrentUser(
        req.user.id,
        updateCurrentUserDto,
      );
      return ResponseDto.ok(result);
    } catch (error) {
      throw error;
    }
  }
  @Delete('delete-me')
  @UseGuards(AuthGuard)
  async deleteMyAccount(@Req() req: Request) {
    try {
      const result = await this.userService.deleteCurrentUser(req.user.id);
      return ResponseDto.ok(result);
    } catch (error) {
      throw error;
    }
  }
  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.userService.logout(res);
      return ResponseDto.success(result, 'your logout successfully');
    } catch (error) {
      throw error;
    }
  }
}
