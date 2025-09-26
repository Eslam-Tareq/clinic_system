import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeSlot } from './time-slot.entity';
import { CreateTimeSlotDto } from './dtos/create-one-time-slot.dto';
import { CreateMultipleTimeSlotsDto } from './dtos/create-multiple-time-slots.dto';
import { ApiFeatures } from '../common/utils/api_features';
import { GetAllQueryDto } from './dtos/get-all-query.dto';
import { UpdateTimeSlotDto } from './dtos/update-one-time-slot.dto';

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
  async getAllTimeSlots(queryObject: GetAllQueryDto) {
    const dataBaseQuery = `
    SELECT 
  to_char(date::date, 'YYYY-MM-DD') AS slot_date,
  json_agg(
    json_build_object(
      'id', id,
      'time', to_char(date, 'HH12:MI AM'),
      'status', status
    ) ORDER BY date
  ) AS slots
FROM time_slots
WHERE date >= '${new Date().toISOString()}'
GROUP BY date::date
ORDER BY slot_date
  `;
    const totalItemsNumber = (
      await this.TimeSlotRepo.query(`
    select to_char(date::date, 'YYYY-MM-DD') AS slot_date
 from time_slots  WHERE date>= '${new Date().toISOString()}'
 group by date::date
      `)
    ).length;
    const apiFeatures = new ApiFeatures(dataBaseQuery, queryObject);
    const paginationMeta = apiFeatures.paginate(totalItemsNumber);
    const timeSlots = await this.TimeSlotRepo.query(apiFeatures.dataBaseQuery);
    paginationMeta.numOfItems = timeSlots.length;
    return {
      data: timeSlots,
      paginationMeta,
    };
  }
  async createMultipleTimeSlots(
    createMultipleTimeSlotsDto: CreateMultipleTimeSlotsDto,
  ) {
    const { start_date, end_date, interval } = createMultipleTimeSlotsDto;
    const minValidInterval = Math.floor(
      (new Date(end_date).getTime() - new Date(start_date).getTime()) /
        (1000 * 60),
    );
    if (minValidInterval < interval) {
      throw new BadRequestException(
        `interval is greater than the interval between start_date and end_date`,
      );
    }
    const last_date = (
      await this.TimeSlotRepo.query(`
      select max(date) from time_slots
      `)
    )[0].max;
    if (new Date(start_date) <= new Date(last_date)) {
      throw new BadRequestException(
        `start_date must be greater than ${last_date}`,
      );
    }
    const timeSlots = this.TimeSlotRepo.query(`
      INSERT INTO time_slots ("date", "status")
SELECT gs, 'available'
FROM generate_series(
    '${start_date}'::timestamptz,
    '${end_date}'::timestamptz,
    '${interval} minutes'::interval
) gs
WHERE gs >= '${start_date}'::timestamptz
  AND gs <= '${end_date}'::timestamptz
  returning *
      `);
    return timeSlots;
  }
  async updateOneTimeSlot(
    updateTimeSlotDto: UpdateTimeSlotDto,
    timeSlotId: number,
  ) {
    const timeSlot = await this.TimeSlotRepo.findOne({
      where: { id: timeSlotId },
    });
    if (!timeSlot) {
      throw new NotFoundException('time slot not found');
    }
    if (updateTimeSlotDto.date) {
      const checkDate = await this.TimeSlotRepo.findOne({
        where: { date: updateTimeSlotDto.date },
      });
      console.log('checkDate', checkDate);
      if (
        checkDate &&
        new Date(timeSlot.date).getTime() !=
          new Date(updateTimeSlotDto.date).getTime()
      ) {
        throw new BadRequestException(`${timeSlot.date} is already found`);
      }
    }
    timeSlot.date = updateTimeSlotDto.date;
    timeSlot.status = updateTimeSlotDto.status;
    const updatedTimeSlot = await this.TimeSlotRepo.save(timeSlot);
    return updatedTimeSlot;
  }
  async deleteOneTimeSlot(timeSlotId: number) {
    const timeSlot = await this.TimeSlotRepo.findOne({
      where: { id: timeSlotId },
    });
    if (!timeSlot) {
      throw new NotFoundException('time slot not found');
    }
    await this.TimeSlotRepo.remove(timeSlot);
  }
}
