import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateFeedbackDto {
  @IsOptional()
  @IsString()
  feedback?: string;
  @IsOptional()
  @Min(1)
  @Max(5)
  rate?: number;
}
