import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';
import { FireBaseService } from '../firebase/firebase.service';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { notificationData } from '../types/notification-data.type';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    private readonly firebaseService: FireBaseService,
  ) {}
  async createNotification(createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto);
    let { type, title, message, userId, appointmentId, bookingId } =
      createNotificationDto;
    const notification = this.notificationRepo.create({
      type,
      title,
      message,
      user: { id: userId },
      appointment: { id: appointmentId },
      //booking: { id: bookingId },
    });
    const newNotification = await this.notificationRepo.save(notification);
    return newNotification;
  }
  async sendNotification(
    notification: notificationData,
    title?: string,
    body?: string,
  ) {
    const tokens = await this.firebaseService.getUserTokens(
      +notification.userId,
    );
    console.log(tokens);
    if (!tokens) {
      throw new NotFoundException('tokens not found');
    }
    return await this.firebaseService.sendNotifications(
      tokens,
      notification,
      title,
      body,
    );
  }
  async getAllMyNotifications(userId: number) {
    const notifications = await this.notificationRepo.find({
      where: { user: { id: userId } },
      relations: ['appointment', 'booking'],
    });
    return notifications;
  }
  async sendNotificationTest(createNotificationDto: CreateNotificationDto) {
    const notification = await this.createNotification(createNotificationDto);

    const notificationData = {
      message: notification.message,
      title: notification.title,
      type: notification.type,
      userId: `${notification.user.id}`,
      id: `${notification.id}`,
      appointmentId: `${notification.appointment.id}`,
      bookingId: `${notification?.booking?.id}`,
    };
    const sendNotificationResponse = await this.sendNotification(
      notificationData,
      notificationData.title,
      notificationData.message,
    );
    return sendNotificationResponse;
  }
}
