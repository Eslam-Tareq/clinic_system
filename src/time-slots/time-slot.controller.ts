import { Body, Controller, Get, Post } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dtos/time-slot.dto';
import { ResponseDto } from 'src/common/filters/response.dto';

@Controller('time-slot')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}
  @Post()
  async createOne(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    try {
      const result =
        await this.timeSlotService.createOneSlot(createTimeSlotDto);
      return ResponseDto.created(result);
    } catch (error) {
      throw error;
    }
  }
  @Get()
  async getAllTimeSlots() {
    try {
      const result = await this.timeSlotService.getAllTimeSlots();
      return ResponseDto.success(result);
    } catch (error) {
      throw error;
    }
  }
}
