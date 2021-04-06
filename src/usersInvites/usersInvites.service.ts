import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getConnection, getRepository } from 'typeorm';
import { UsersInvitesEntity } from './entity/usersInvites.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { InvitesEntity } from '../invites/entity/invites.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { RolesEntity } from '../roles/entity/roles.entity';
import { UserDataDto } from './dto/userData.dto';

@Injectable()
export class UsersInvitesService {
  constructor(
    private emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async createAndSendInvate(data: UserDataDto): Promise<any> {
    let message = {};
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userInvite = await this.createIvite(data);

      const result = await queryRunner.manager.save(userInvite);

      const { user } = result;

      const token = this.jwtService.sign({
        email: data.email,
        userId: user.id,
      });

      await this.emailService.sendInvite(
        { name: data.firstName, email: data.email },
        token,
      );

      await queryRunner.commitTransaction();

      message = { message: 'SUCCESS' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      message = { message: 'FAILURE', err };
    } finally {
      await queryRunner.release();
    }
    return message;
  }

  private async createIvite(data: UserDataDto): Promise<UsersInvitesEntity> {
    const user = new UsersEntity();
    user.firstname = data.firstName;
    user.lastname = data.lastName;
    user.email = data.email;
    user.password = 'secret';
    const roleRepository = getRepository(RolesEntity);
    const role = await roleRepository.findOne({ role: data.role });
    user.role = role;
    const invite = new InvitesEntity();
    const now = new Date();
    //TODO: raise time duration in props of the method
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    invite.expiresAt = expiresAt;
    const userInvite = new UsersInvitesEntity();
    userInvite.invite = invite;
    userInvite.user = user;
    return userInvite;
  }
}
