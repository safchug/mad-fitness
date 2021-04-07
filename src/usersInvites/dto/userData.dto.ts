import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UserDataDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsNumberString()
  roleId: number;
}
