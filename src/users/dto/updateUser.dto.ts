import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsInt,
  IsNumber,
  Length,
  Min,
  Max,
} from 'class-validator';
import { Role } from '../../roles/interface/roles.interface';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 100)
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsString()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @Length(1, 100)
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  role: Role;
}
