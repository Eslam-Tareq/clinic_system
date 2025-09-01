import { Module } from '@nestjs/common';
import { FirebaseController } from './firebase.controller';
import { FireBaseService } from './firebase.service';

@Module({ controllers: [FirebaseController], providers: [FireBaseService] })
export class FirebaseModule {}
