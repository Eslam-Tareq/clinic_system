import { Type } from 'class-transformer';
import {
  IsString,
  IsDateString,
  IsOptional,
  IsArray,
  IsNumber,
  IsInt,
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
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  removed_attachments_ids?: number[];
}
