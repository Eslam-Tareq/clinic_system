import { Module } from '@nestjs/common';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlotService } from './time-slot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot } from './time-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot])],
  controllers: [TimeSlotController],
  providers: [TimeSlotService],
})
export class TimeSlotModule {}
