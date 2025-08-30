import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { IsEmailUniqueConstraint } from 'src/common/validators/email-exists.validator';

import { GoogleModule } from 'src/google/google.module';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GoogleModule],
  controllers: [AuthController],
  providers: [AuthService, IsEmailUniqueConstraint, AuthGuard],
})
export class AuthModule {}
