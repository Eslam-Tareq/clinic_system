import { Module } from '@nestjs/common';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlotService } from './time-slot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot } from './time-slot.entity';
import { TimeSlotCronService } from './time-slot.cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot])],
  controllers: [TimeSlotController],
  providers: [TimeSlotService, TimeSlotCronService],
  exports: [TimeSlotService],
})
export class TimeSlotModule {}
