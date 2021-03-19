import { Module } from '@nestjs/common';
import { RefreshTokensController } from './refresh-tokens.controller';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokensEntity } from './entity/refresh-tokens.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature([RefreshTokensEntity])],
   controllers: [RefreshTokensController],
   providers: [RefreshTokensService],
})
export class RefreshTokensModule {}
