import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';
import { Exclude } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @Exclude()
  readonly password: never;

  @IsOptional()
  readonly roles: Role[];
}
