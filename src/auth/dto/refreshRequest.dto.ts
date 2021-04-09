import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty({
    example: 'your token must be here',
    type: String,
  })
  refresh_token: string;
}
