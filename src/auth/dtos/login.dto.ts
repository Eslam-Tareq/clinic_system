// dtos/login.dto.ts

import { IsEmail, IsString, Length } from 'class-validator';
// --- Swagger Import Added ---
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  // --- Swagger Property Documentation ---
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string; // --- Swagger Property Documentation ---

  @ApiProperty({
    description: 'The password for the user account (must be 8-32 characters).',
    example: 'Password123!',
  })
  @IsString()
  @Length(8, 32)
  password: string;
}
