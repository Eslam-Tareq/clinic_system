import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TimeSlotModule } from '../time-slots/time-slot.module';
import { UserModule } from '../user/user.module';
import { Appointment } from './appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [
    UserModule,
    TimeSlotModule,
    TypeOrmModule.forFeature([Appointment]),
  ],
})
export class AppointmentModule {}
