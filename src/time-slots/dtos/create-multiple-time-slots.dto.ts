import { IsDateString, IsInt, Min } from 'class-validator';
import { IsFutureDate } from '../../common/validators/is-future-date.validator';
import { IsGreaterThan } from '../../common/validators/valid-date-interval.validator';

export class CreateMultipleTimeSlotsDto {
  @IsDateString()
  @IsFutureDate()
  start_date: Date;
  @IsDateString()
  @IsFutureDate()
  @IsGreaterThan('start_date')
  end_date: Date;
  @IsInt()
  @Min(15)
  interval: number;
}
