import { Module } from '@nestjs/common';
import { REFRESH_TOKENS_SERVICE } from './refreshTokens.service';
import { RefreshTokensEntity } from './entity/refreshTokens.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { refreshTokensService, refreshTokensDAO } from '../config/configDi';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokensEntity])],
  providers: [refreshTokensService, refreshTokensDAO],
  exports: [REFRESH_TOKENS_SERVICE],
})
export class RefreshTokensModule {}
