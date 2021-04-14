import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitesEntity } from './entity/invites.entity';
import { invitesDAO, invitesService } from '../config/configDi';
import { INVITES_SERVICE } from './invites.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvitesEntity])],
  exports: [TypeOrmModule, INVITES_SERVICE],
  providers: [invitesService, invitesDAO],
})
export class InvitesModule {}
