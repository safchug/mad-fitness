import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInvitesService } from './usersInvites.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { EmailModule } from '../email/email.module';
import { UsersInvitesEntity } from './entity/usersInvites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersInvitesEntity]),
    EmailModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1w' },
    }),
  ],
  providers: [UsersInvitesService],
  exports: [TypeOrmModule, JwtModule],
})
export class UsersInvitesModule {}
