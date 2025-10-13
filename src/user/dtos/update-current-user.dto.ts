import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { IsEmailUnique } from '../../common/validators/email-exists.validator';
import { UserGender } from '../../enums/user-gender.enum';

export class UpdateCurrentUserDto {
  @IsOptional()
  @IsString()
  first_name: string;
  @IsOptional()
  @IsString()
  last_name: string;
  @IsOptional()
  @IsEmail()
  @IsEmailUnique()
  email: string;
  @IsOptional()
  @IsString()
  @Length(8, 32)
  password: string;
  @IsOptional()
  @IsPhoneNumber('EG')
  phone: string;
  @IsOptional()
  @IsEnum(UserGender)
  gender: string;
}
