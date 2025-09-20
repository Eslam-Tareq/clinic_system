import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dtos/create-one-time-slot.dto';
import { ResponseDto } from 'src/common/filters/response.dto';
import { CreateMultipleTimeSlotsDto } from './dtos/create-multiple-time-slots.dto';
import { GetAllQueryDto } from './dtos/get-all-query.dto';
import { UpdateTimeSlotDto } from './dtos/update-one-time-slot.dto';

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
  @Post('create-multiple-time-slots')
  async createMultipleTimeSlots(
    @Body() createMultipleTimeSlotsDto: CreateMultipleTimeSlotsDto,
  ) {
    try {
      const result = await this.timeSlotService.createMultipleTimeSlots(
        createMultipleTimeSlotsDto,
      );
      return ResponseDto.created(result);
    } catch (error) {
      throw error;
    }
  }
  @Get()
  async getAllTimeSlots(@Query() queryObject: GetAllQueryDto) {
    try {
      const result = await this.timeSlotService.getAllTimeSlots(queryObject);
      return ResponseDto.success(result);
    } catch (error) {
      throw error;
    }
  }
  @Put(':id')
  async updateOneTimeSlot(
    @Body() updateTimeSlotDto: UpdateTimeSlotDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const result = await this.timeSlotService.updateOneTimeSlot(
        updateTimeSlotDto,
        id,
      );
      return ResponseDto.success(result);
    } catch (error) {
      throw error;
    }
  }
  @Delete(':id')
  async deleteOneTimeSlot(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.timeSlotService.deleteOneTimeSlot(id);
      return ResponseDto.success(result);
    } catch (error) {
      throw error;
    }
  }
}
