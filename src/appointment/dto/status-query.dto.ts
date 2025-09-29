import { IsEnum, IsOptional } from 'class-validator';
import { AppointmentStatus } from '../../enums/appointment-status.enum';

export class StatusQueryDto {
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}
