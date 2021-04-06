import { IsString, IsNotEmpty, Length } from 'class-validator';

export class RefreshRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  refresh_token: string;
}
