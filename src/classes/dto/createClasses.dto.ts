import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateClassesDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  label: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  max: number;
}
