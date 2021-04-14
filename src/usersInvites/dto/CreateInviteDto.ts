import { IsEmail, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { Role } from '../../roles/interface/roles.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInviteDto {
  @IsEmail()
  @ApiProperty({
    example: 'user@madfitness.com',
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 3,
    type: Number,
  })
  role: Role;
}
