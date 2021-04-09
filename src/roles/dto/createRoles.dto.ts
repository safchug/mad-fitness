import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolesDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @ApiProperty({
    example: 'new_role',
    type: String,
  })
  role: string;
}
