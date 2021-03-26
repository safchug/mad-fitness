import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInvitesEntity } from './entity/users_invites.entity';
import { UsersInvitesService } from './users-invites.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersInvitesEntity]),
    EmailModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
    }),
  ],
  providers: [UsersInvitesService],
  exports: [TypeOrmModule, JwtModule],
})
export class UsersInvitesModule {}
