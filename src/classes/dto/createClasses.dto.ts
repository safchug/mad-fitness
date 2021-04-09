import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassesDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @ApiProperty({
    example: 'Class1',
    type: String,
  })
  label: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty({
    example: 'This class for strong men',
    type: String,
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    example: 10,
    type: Number,
  })
  max: number;
}
