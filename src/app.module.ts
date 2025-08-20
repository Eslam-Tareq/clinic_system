import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typerorm.module';
import { UserModule } from './user/user.module';

import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './common/filters/custom-exception.filter';

@Module({
  imports: [AuthModule, TypeOrmConfig, UserModule, UserModule],
  providers: [{ provide: APP_FILTER, useClass: CatchEverythingFilter }],
})
export class AppModule {}
