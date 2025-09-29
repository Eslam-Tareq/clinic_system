import { IsEnum } from 'class-validator';
import { AppointmentStatus } from '../../enums/appointment-status.enum';

export class ChangeAppointmentStatusDto {
  @IsEnum(AppointmentStatus)
  status: string;
}
