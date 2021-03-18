import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvitesModule } from './invites/invites.module';
import { UsersInvitesModule } from './users_invites/users_invites.module';

@Module({
  imports: [InvitesModule, UsersInvitesModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}