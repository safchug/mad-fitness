import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInvitesEntity } from './entity/usersInvites.entity';
import { MailModule } from '../mail/mail.module';
import { userInvitesDAO, usersInvitesService } from '../config/configDi';
import { UsersInvitesController } from './usersInvites.controller';
import { USERS_INVITES_SERVICE } from './usersInvites.service';
import { LoggerModule } from '../logger/logger.module';
import { InvitesModule } from '../invites/invites.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersInvitesEntity]),
    MailModule,
    LoggerModule,
    InvitesModule,
    UsersModule,
  ],
  providers: [usersInvitesService, userInvitesDAO],
  controllers: [UsersInvitesController],
  exports: [TypeOrmModule, USERS_INVITES_SERVICE],
})
export class UsersInvitesModule {}
