import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SheduleUsersModule } from './shedule_users/shedule_users.module';
import { ClassesModule } from './classes/classes.module';
import { SheduleModule } from './shedule/shedule.module';
import { InvitesModule } from './invites/invites.module';
import { UsersInvitesModule } from './users_invites/users_invites.module';
@Module({
  imports: [RolesModule, RefreshTokensModule,ClassesModule, SheduleModule, UsersModule, SheduleUsersModule,InvitesModule, UsersInvitesModule,  TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}