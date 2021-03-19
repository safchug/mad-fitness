import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInvitesEntity } from './entity/users_invites.entity';

@Module({
   imports: [TypeOrmModule.forFeature([UsersInvitesEntity])],
   exports: [TypeOrmModule],
})
export class UsersInvitesModule {}
