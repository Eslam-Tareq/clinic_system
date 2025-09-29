import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { AppointmentType } from '../../enums/appointment-type.enum';

export class CreateAppointmentDto {
  @IsString()
  name: string;
  @IsPhoneNumber('EG')
  phone: string;
  @IsInt()
  time_slot_id: number;
  @IsOptional()
  @IsEnum(AppointmentType)
  type?: AppointmentType;
  @IsOptional()
  @IsString()
  reason?: string;
}
