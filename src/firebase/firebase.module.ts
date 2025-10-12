import { Module } from '@nestjs/common';
import { FirebaseController } from './firebase.controller';
import { FireBaseService } from './firebase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseToken } from './firebase-token.entity';
import { Notification } from '../notification/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FirebaseToken, Notification])],
  controllers: [FirebaseController],
  providers: [FireBaseService],
  exports: [FireBaseService],
})
export class FirebaseModule {}
