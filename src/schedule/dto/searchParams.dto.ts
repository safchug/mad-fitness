import { User } from '../../users/interface/users.interface';
import { IsOptional, IsDateString, IsNumberString } from 'class-validator';

export class SearchParamsDto {
  @IsOptional()
  @IsNumberString()
  trainer: User;

  @IsOptional()
  @IsDateString()
  byDate: Date;

  @IsOptional()
  @IsDateString()
  byTime: Date;
}
