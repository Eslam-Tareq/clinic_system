import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeSlot } from './time-slot.entity';
import { CreateTimeSlotDto } from './dtos/create-one-time-slot.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TimeSlotService } from './time-slot.service';

@Injectable()
export class TimeSlotCronService {
  constructor(
    @InjectRepository(TimeSlot)
    private readonly TimeSlotRepo: Repository<TimeSlot>,
  ) {}
  @Cron('0 0 */2 * *', {
    name: 'generateComingTimeSlots',
  })
  async generateTimeSlots(createTimeSlotDto: CreateTimeSlotDto) {
    console.log('generate time slots cron job started ');
    const lastTimeSlotDate = await this.TimeSlotRepo.query(`
  select max(date) from time_slots
  limit 1
      `);
    const timeIntervalAsDays = Math.ceil(
      (new Date(lastTimeSlotDate[0].max).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );
    if (timeIntervalAsDays <= 14) {
      const timeSlots = await this.TimeSlotRepo
        .query(`INSERT INTO time_slots (date, status)
SELECT 
    ts AS date,
    'available'::time_slots_status_enum  
FROM generate_series(
    (SELECT (max(date) + interval '1 day') FROM time_slots),      
    (SELECT (max(date) + interval '15 day') FROM time_slots),     
    interval '1 hour'                                             
) AS ts
WHERE EXTRACT(HOUR FROM ts) BETWEEN 10 AND 16;                    
`);
    }
  }
}
