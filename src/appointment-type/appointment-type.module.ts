import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentType } from './appointment-type.entity';
import { AppointmentTypeService } from './appointment-type.service';
import { AppointmentTypeController } from './appointment-type.controller';

@Module({
  controllers: [AppointmentTypeController],
  providers: [AppointmentTypeService],
  imports: [UserModule, TypeOrmModule.forFeature([AppointmentType])],
  exports: [AppointmentTypeService],
})
export class AppointmentTypeModule {}
