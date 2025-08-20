import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { IsEmailUniqueConstraint } from 'src/common/validators/email-exists.validator';
import { TokenModule } from 'src/token/token.module';
import { GoogleService } from 'src/google/google.service';
import { GoogleModule } from 'src/google/google.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule, GoogleModule],
  controllers: [AuthController],
  providers: [AuthService, IsEmailUniqueConstraint],
})
export class AuthModule {}
