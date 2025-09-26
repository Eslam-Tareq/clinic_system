import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { IsEmailUnique } from '../../common/validators/email-exists.validator';
import { Match } from '../../common/validators/match.validator';
import { UserGender } from '../../enums/user-gender.enum';

export class SignUpDto {
  @IsString()
  @Length(3, 15)
  first_name: string;
  @IsString()
  @Length(3, 15)
  last_name: string;
  @IsEmail()
  @IsEmailUnique()
  email: string;
  @IsString()
  @Length(8, 32)
  password: string;
  @IsString()
  @Match('password')
  confirmPassword: string;
  @IsOptional()
  @IsEnum(UserGender)
  gender: string;
  @IsPhoneNumber('EG')
  phone: string;
}
