import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetAllQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;
}
