import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { getConnection } from 'typeorm';
import { UsersInvitesEntity } from './entity/users_invites.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { InvitesEntity } from '../invites/entity/invites.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersInvitesService {
  constructor(
    private emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async createAndSendInvate(data: any): Promise<any> {
    let message = {};
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userInvite = this.createIvite(data);

      const result = await queryRunner.manager.save(userInvite);

      const { user } = result;

      const token = this.jwtService.sign({
        email: data.email,
        userId: user.id,
      });

      await this.emailService.sendInvite(
        { name: data.name, email: data.email },
        token,
      );

      await queryRunner.commitTransaction();

      message = { message: 'SUCCESS' };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      message = { message: 'FAILURE', err };
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
    return message;
  }

  private createIvite(data): UsersInvitesEntity {
    const user = new UsersEntity();
    user.firstname = data.firstName;
    user.lastname = data.lastName;
    user.email = data.email;
    user.password = 'secret';
    const invite = new InvitesEntity();
    const userInvite = new UsersInvitesEntity();
    userInvite.invite = invite;
    userInvite.user = user;
    return userInvite;
  }
}
