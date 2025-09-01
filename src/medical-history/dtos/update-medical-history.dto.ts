import {
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class UpdateMedicalHistoryDto {
  @IsOptional()
  @IsString()
  doctor?: string;
  @IsOptional()
  @IsString()
  diagnosis?: string;
  @IsOptional()
  @IsString()
  treatment?: string;
  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}
