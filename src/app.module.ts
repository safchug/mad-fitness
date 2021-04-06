import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { RefreshTokensModule } from './refreshTokens/refreshTokens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ScheduleUsersModule } from './scheduleUsers/scheduleUsers.module';
import { ClassesModule } from './classes/classes.module';
import { ScheduleModule } from './schedule/schedule.module';
import { InvitesModule } from './invites/invites.module';
import { UsersInvitesModule } from './usersInvites/usersInvites.module';
import { UsersInvitesService } from './usersInvites/usersInvites.service';
import { UsersInvitesController } from './usersInvites/usersInvites.controller';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
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
