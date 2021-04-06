import { IsEmail, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { Role } from '../../roles/interface/roles.interface';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  role: Role;
}
