import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  feedback: string;
  @IsNumber()
  @Min(1)
  @Max(5)
  rate: number;
}
