import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';

@Module({
  imports: [RolesModule, RefreshTokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
