import { Module } from '@nestjs/common';
//import { RefreshTokensController } from './refreshTokens.controller';
import {
  RefreshTokensService,
  REFRESH_TOKENS_SERVICE,
} from './refreshTokens.service';
import { RefreshTokensEntity } from './entity/refreshTokens.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokensEntity])],
  providers: [
    {
      useClass: RefreshTokensService,
      provide: REFRESH_TOKENS_SERVICE,
    },
  ],
  exports: [REFRESH_TOKENS_SERVICE],
  //  controllers: [RefreshTokensController],
})
export class RefreshTokensModule {}
