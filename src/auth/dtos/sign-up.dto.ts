// dtos/sign-up.dto.ts

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
// --- Swagger Import Added ---
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  // --- Swagger Property Documentation ---
  @ApiProperty({
    description: "The user's first name.",
    example: 'John',
  })
  @IsString()
  @Length(3, 15)
  first_name: string; // --- Swagger Property Documentation ---

  @ApiProperty({
    description: "The user's last name.",
    example: 'Doe',
  })
  @IsString()
  @Length(3, 15)
  last_name: string; // --- Swagger Property Documentation ---

  @ApiProperty({
    description: 'A unique email address for the user.',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsEmailUnique()
  email: string; // --- Swagger Property Documentation ---

  @ApiProperty({
    description: 'The password for the user account (must be 8-32 characters).',
    example: 'StrongP@ssw0rd',
  })
  @IsString()
  @Length(8, 32)
  password: string; // --- Swagger Property Documentation ---

  @ApiProperty({
    description: 'Password confirmation. Must match the password field.',
    example: 'StrongP@ssw0rd',
  })
  @IsString()
  @Match('password')
  confirmPassword: string; // --- Swagger Property Documentation ---

  @ApiProperty({
    description: "The user's gender (optional).",
    enum: UserGender, // This helps Swagger generate a dropdown for the enum
    example: UserGender.MALE,
    required: false, // Mark it as not required in the Swagger UI
  })
  @IsOptional()
  @IsEnum(UserGender)
  gender: string; // --- Swagger Property Documentation ---

  @ApiProperty({
    description: "The user's phone number (must be a valid Egyptian number).",
    example: '+201012345678',
  })
  @IsPhoneNumber('EG')
  phone: string;
}
