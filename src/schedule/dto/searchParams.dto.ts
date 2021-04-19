import { User } from '../../users/interface/users.interface';
import {
  IsOptional,
  IsDateString,
  IsNumberString,
  IsString,
} from 'class-validator';

export class SearchParamsDto {
  @IsOptional()
  @IsNumberString()
  trainer: User;

  @IsOptional()
  @IsDateString()
  fromDate: Date;

  @IsOptional()
  @IsDateString()
  untilDate: Date;

  @IsOptional()
  @IsString()
  sortBy: string;

  @IsOptional()
  @IsString()
  sort: string;
}
