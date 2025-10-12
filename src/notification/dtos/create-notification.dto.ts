import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { NotificationType } from '../../enums/notification-type.enum';

export class CreateNotificationDto {
  @IsEnum(NotificationType)
  type: NotificationType;
  @IsString()
  title: string;
  @IsString()
  message: string;
  @IsInt()
  userId: number;
  @IsOptional()
  @IsInt()
  appointmentId?: number;
  @IsOptional()
  @IsInt()
  bookingId?: number;
}
