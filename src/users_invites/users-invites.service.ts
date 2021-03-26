import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { getConnection } from 'typeorm';
import { UsersInvitesEntity } from './entity/users_invites.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { InvitesEntity } from '../invites/entity/invites.entity';

@Injectable()
export class UsersInvitesService {
  constructor(private mailService: MailerService) {}

  async createAndSendInvate(data: any): Promise<any> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userInvite = this.createIvite(data);

      const result = await queryRunner.manager.save(userInvite);

      console.log('result', result);

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      console.log(err);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
  private createIvite(data): UsersInvitesEntity {
    const user = new UsersEntity();
    user.email = data.email;
    const invite = new InvitesEntity();
    const userInvite = new UsersInvitesEntity();
    userInvite.invite = invite;
    userInvite.user = user;
    return userInvite;
  }
}
