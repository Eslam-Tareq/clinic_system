import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from '../token/token.module';
import { User } from '../user/user.entity';
import { GoogleService } from './google.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
