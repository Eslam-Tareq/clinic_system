import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typerorm.module';
import { UserModule } from './user/user.module';

import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './common/filters/custom-exception.filter';
import { SupabaseModule } from './supabase/supabase.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { TimeSlotModule } from './time-slots/time-slot.module';
import { AppController } from './app.controller';
import { AppointmentModule } from './appointment/appointment.module';
import { AppointmentTypeModule } from './appointment-type/appointment-type.module';
import { FirebaseModule } from './firebase/firebase.module';
import { NotificationModule } from './notification/notification.module';
import { NestScheduleModule } from './config/nestSchedule.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmConfig,
    UserModule,
    UserModule,
    SupabaseModule,
    MedicalHistoryModule,
    TimeSlotModule,
    AppointmentModule,
    AppointmentTypeModule,
    FirebaseModule,
    NotificationModule,
    NestScheduleModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: CatchEverythingFilter }],
  controllers: [AppController],
})
export class AppModule {}
