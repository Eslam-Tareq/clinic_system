import {
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateMedicalHistoryDto {
  @IsString()
  doctor: string;

  @IsString()
  diagnosis: string;

  @IsString()
  treatment: string;

  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}
