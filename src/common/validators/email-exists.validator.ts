// validators/is-email-unique.validator.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { User } from '../../user/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async validate(email: string, _args: ValidationArguments): Promise<boolean> {
    console.log('Validating email:');
    const found = await this.userRepo.findOneBy({ email });
    console.log('Email found:', found);
    return !found;
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Email $value is already registered';
  }
}

// Decorator wrapper
export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsEmailUniqueConstraint,
    });
  };
}
