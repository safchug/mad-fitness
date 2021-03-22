import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitesEntity } from './entity/invites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvitesEntity])],
  exports: [TypeOrmModule],
})
export class InvitesModule {}
