import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TimeSlotModule } from '../time-slots/time-slot.module';
import { UserModule } from '../user/user.module';
import { Appointment } from './appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentTypeModule } from '../appointment-type/appointment-type.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [
    UserModule,
    TimeSlotModule,
    AppointmentTypeModule,
    TypeOrmModule.forFeature([Appointment]),
    NotificationModule,
  ],
})
export class AppointmentModule {}
