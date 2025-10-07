import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { AppointmentType } from '../../enums/appointment-type.enum';

export class CreateAppointmentTypeDto {
  @IsString()
  title: string;
  @IsEnum(AppointmentType)
  type: AppointmentType;
  @IsInt()
  price: number;
  @IsOptional()
  @IsInt()
  discount: number;
  @IsString()
  description: string;
}
