import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateRefreshTokensDto {
  @IsNumber()
  userId: number;

  @IsString()
  token: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
