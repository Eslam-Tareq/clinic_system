import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { IsFutureDate } from '../../common/validators/is-future-date.validator';
import { TimeSlotStatus } from '../../enums/time-slot-status.enum';

export class CreateTimeSlotDto {
  // @ApiProperty({ example: 1, description: 'Doctor ID' })
  // @IsInt()
  // doctorId: number;

  @ApiProperty({ example: '2025-09-20', description: 'Slot date (yyyy-MM-dd)' })
  @IsDateString()
  @IsFutureDate()
  date: string;

  @ApiProperty({
    enum: TimeSlotStatus,
    example: TimeSlotStatus.Available,
    required: false,
  })
  @IsEnum(TimeSlotStatus)
  @IsOptional()
  status?: TimeSlotStatus;
}
