import { Module } from '@nestjs/common';
import { RefreshTokensController } from './refresh-tokens.controller';
import { RefreshTokensService } from './refresh-tokens.service';

@Module({
  controllers: [RefreshTokensController],
  providers: [RefreshTokensService]
})
export class RefreshTokensModule {}
