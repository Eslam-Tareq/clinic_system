import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { Request } from 'express';
import { ResponseDto } from '../common/filters/response.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get('my-notifications')
  @UseGuards(AuthGuard)
  async getMyNotifications(@Req() req: Request) {
    try {
      const result = await this.notificationService.getAllMyNotifications(
        req.user.id,
      );
      return ResponseDto.ok(result);
    } catch (error) {
      throw error;
    }
  }
}
