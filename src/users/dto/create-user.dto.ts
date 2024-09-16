import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
import { Role } from '../enums/role.enum';
  
  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email' })
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
  
    @IsOptional()
    readonly roles: Role[];
  }
  