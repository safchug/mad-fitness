import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  Length,
  IsDate,
  IsDateString,
} from 'class-validator';
import { User } from '../../users/interface/users.interface';
import { Class } from '../../classes/interface/classes.interface';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  class: Class;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  trainer: User;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  location: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
