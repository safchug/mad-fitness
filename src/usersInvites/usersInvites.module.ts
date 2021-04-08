import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  USERS_INVITES_SERVICE,
  UsersInvitesService,
} from './usersInvites.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { EmailModule } from '../email/email.module';
import { UsersInvitesEntity } from './entity/usersInvites.entity';
import {
  invitesDAO,
  mailService,
  rolesDAO,
  usersDAO,
  usersInvitesDAO,
  usersInvitesService,
} from '../config/configDi';
import { UsersEntity } from '../users/entity/users.entity';
import { RolesEntity } from '../roles/entity/roles.entity';
import { InvitesEntity } from '../invites/entity/invites.entity';
import { UsersInvitesController } from './usersInvites.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersInvitesEntity]),
    TypeOrmModule.forFeature([UsersEntity]),
    TypeOrmModule.forFeature([RolesEntity]),
    TypeOrmModule.forFeature([InvitesEntity]),
    EmailModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1w' },
    }),
  ],
  providers: [
    usersInvitesService,
    invitesDAO,
    usersInvitesDAO,
    usersDAO,
    rolesDAO,
  ],
  controllers: [UsersInvitesController],
  exports: [TypeOrmModule, JwtModule, USERS_INVITES_SERVICE],
})
export class UsersInvitesModule {}
