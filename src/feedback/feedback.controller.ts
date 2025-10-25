import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { feedbackService } from './feedback.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { ResponseDto } from '../common/filters/response.dto';
import { UpdateFeedbackDto } from './dtos/update-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: feedbackService) {}
  @Post()
  @UseGuards(AuthGuard)
  async createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @Req() req: any,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.feedbackService.create(
        userId,
        createFeedbackDto,
      );
      return ResponseDto.created(result);
    } catch (error) {
      throw error;
    }
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateFeedback(
    @Body() updateFeedbackDto: UpdateFeedbackDto,
    @Req() req: any,
    @Param('id', ParseIntPipe) feedbackId: number,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.feedbackService.update(
        userId,
        feedbackId,
        updateFeedbackDto,
      );
      return ResponseDto.created(result);
    } catch (error) {
      throw error;
    }
  }
  @Get()
  async getAllFeedbacks() {
    try {
      const result = await this.feedbackService.getAll();
      return ResponseDto.created(result);
    } catch (error) {
      throw error;
    }
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteFeedback(
    @Req() req: any,
    @Param('id', ParseIntPipe) feedbackId: number,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.feedbackService.delete(userId, feedbackId);
      return ResponseDto.created(result);
    } catch (error) {
      throw error;
    }
  }
}
