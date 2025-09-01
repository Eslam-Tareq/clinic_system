import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typerorm.module';
import { UserModule } from './user/user.module';

import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './common/filters/custom-exception.filter';
import { SupabaseModule } from './supabase/supabase.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmConfig,
    UserModule,
    UserModule,
    SupabaseModule,
    MedicalHistoryModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: CatchEverythingFilter }],
})
export class AppModule {}
