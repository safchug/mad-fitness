import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'admin@madfitness.com',
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @Length(8, 100)
  @ApiProperty({
    example: 'Red12345!',
    type: String,
  })
  password: string;
}
