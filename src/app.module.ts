import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { SheduleUsersModule } from './shedule_users/shedule_users.module';
import { ClassesModule } from './classes/classes.module';
import { SheduleModule } from './shedule/shedule.module';
import { InvitesModule } from './invites/invites.module';
import { UsersInvitesModule } from './users_invites/users_invites.module';
@Module({
  imports: [ClassesModule, SheduleModule, UsersModule, SheduleUsersModule,InvitesModule, UsersInvitesModule,  TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}