import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ScheduleUsersModule } from './schedule_users/schedule_users.module';
import { ClassesModule } from './classes/classes.module';
import { ScheduleModule } from './schedule/schedule.module';
import { InvitesModule } from './invites/invites.module';
import { UsersInvitesModule } from './users_invites/users_invites.module';
import { UsersInvitesService } from './users_invites/users-invites.service';
import { UsersInvitesController } from './users_invites/users-invites.controller';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    RolesModule,
    RefreshTokensModule,
    ClassesModule,
    ScheduleModule,
    UsersModule,
    ScheduleUsersModule,
    InvitesModule,
    UsersInvitesModule,
    TypeOrmModule.forRoot(),
    EmailModule,
  ],
  controllers: [AppController, UsersInvitesController],
  providers: [AppService, UsersInvitesService],
})
export class AppModule {}
