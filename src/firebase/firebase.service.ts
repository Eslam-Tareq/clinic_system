import {
  Injectable,
  OnModuleInit,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import { RegisterTokenDto } from './dtos/register-token.dto';
import { Repository } from 'typeorm';
import { FirebaseToken } from './firebase-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../notification/notification.entity';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import { notificationData } from '../types/notification-data.type';

@Injectable()
export class FireBaseService implements OnModuleInit {
  private readonly logger = new Logger(FireBaseService.name);
  constructor(
    @InjectRepository(FirebaseToken)
    private readonly firebaseTokenRepo: Repository<FirebaseToken>,
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  onModuleInit() {
    if (!admin.apps.length) {
      const serviceAccountPath = path.join(
        process.cwd(),
        'serviceAccountKey.json',
      );

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        storageBucket: process.env.STORAGE_BUCKET,
      });

      this.logger.log('✅ Firebase initialized successfully');
    }
  }

  async registerToken(userId: number, registerTokenDto: RegisterTokenDto) {
    const firebaseToken = this.firebaseTokenRepo.create({
      token: registerTokenDto.token,
      user: { id: userId },
    });
    const newFirebaseToken = await this.firebaseTokenRepo.save(firebaseToken);
    return newFirebaseToken;
  }
  async sendNotifications(
    tokens: string[],
    notification: notificationData,
    title?: string,
    body?: string,
  ) {
    const message: MulticastMessage = {
      data: notification,
      notification: { title, body },
      tokens,
    };
    console.log(message, notification);
    const response = await admin.messaging().sendEachForMulticast(message);
    return response;
  }
  async getUserTokens(userId: number) {
    const tokens = await this.firebaseTokenRepo.find({
      where: { user: { id: userId } },
    });
    const tokensArray = tokens.map((t) => t.token);
    return tokensArray;
  }
  async removeInvalidToken(tokens: string[]) {
    await this.firebaseTokenRepo.query(`
      delete from firebase_token 
      where token in (${tokens.join(',')});
      `);
  }
  async removeOneInvalidToken(token: string) {
    const ctoken = await this.firebaseTokenRepo.findOne({ where: { token } });
    if (!ctoken) {
      throw new NotFoundException('token not found');
    }
    await this.firebaseTokenRepo.remove(ctoken);
  }
}
