import { Module } from '@nestjs/common';
//import { RefreshTokensController } from './refreshTokens.controller';
import { RefreshTokensService } from './refreshTokens.service';
import { RefreshTokensEntity } from './entity/refreshTokens.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokensEntity])],
  //  controllers: [RefreshTokensController],
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
