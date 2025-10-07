import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { AppointmentType } from '../../enums/appointment-type.enum';

export class UpdateAppointmentTypeDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsEnum(AppointmentType)
  type: AppointmentType;
  @IsOptional()
  @IsInt()
  price: number;
  @IsOptional()
  @IsInt()
  discount: number;
  @IsOptional()
  @IsString()
  description: string;
}
