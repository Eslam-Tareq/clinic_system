import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeSlot } from './time-slot.entity';
import { CreateTimeSlotDto } from './dtos/time-slot.dto';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectRepository(TimeSlot)
    private readonly TimeSlotRepo: Repository<TimeSlot>,
  ) {}
  async createOneSlot(createTimeSlotDto: CreateTimeSlotDto) {
    const duplicateTimeSlot = await this.TimeSlotRepo.findOne({
      where: { date: createTimeSlotDto.date },
    });
    if (duplicateTimeSlot) {
      throw new BadRequestException('date already found');
    }
    const newTimeSlot = this.TimeSlotRepo.create({
      date: createTimeSlotDto.date,
      status: createTimeSlotDto.status,
    });
    const timeSlot = await this.TimeSlotRepo.save(newTimeSlot);
    return timeSlot;
  }
  async getAllTimeSlots() {
    const timeSlots = await this.TimeSlotRepo.query(`
    SELECT 
      to_char(date::date, 'YYYY-MM-DD') AS slot_date,
      json_agg(
        json_build_object(
          'id', id,
          'time', to_char(date, 'HH24:MI'),
          'status', status
        ) ORDER BY date
      ) AS slots
    FROM time_slots
    GROUP BY date::date
    ORDER BY slot_date;
  `);
    return timeSlots;
  }
}
