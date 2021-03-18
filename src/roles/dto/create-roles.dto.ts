import { IsDateString, IsString } from 'class-validator';

export class CreateRolesDto {
  @IsString()
  role: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
