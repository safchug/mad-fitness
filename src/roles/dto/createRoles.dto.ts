import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateRolesDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  role: string;
}
