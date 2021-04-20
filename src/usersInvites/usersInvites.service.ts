import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserInvite } from '../mail/interface/userInvite.interface';
import {
  FITNESS_LOGGER_SERVICE,
  FitnessLoggerService,
} from '../logger/logger.service';
import { MAIL_SERVICE, IMailService } from '../mail/mail.service';
import { IUsersInvitesDAO, USERS_INVITES_DAO } from '../DAO/usersInvitesDAO';
import { USERS_SERVICE, IUsersService } from '../users/users.service';
import { UserInvites } from './interface/userInvites.interface';
import { INVITES_SERVICE, IInvitesService } from '../invites/invites.service';
import { inviteConfig } from '../config/mail/invite/invite.config';
import { configApp } from '../config/configApp';
import { SendMail } from '../mail/interface/sendMail.interface';

export const USERS_INVITES_SERVICE = 'USERS INVITES SERVICE';

export interface IUsersInvitesService {
  createAndSendUserInvite(userInvite: UserInvite): Promise<UserInvites>;
  sendInvite(mail: SendMail): Promise<UserInvites>;
  createUserInvite(userInvite: UserInvites): Promise<UserInvites>;
  updateUserInvite(userInvite: UserInvites): Promise<UserInvites>;
  makeInvitePayload(email: string, invite: string): Promise<SendMail>;
}

@Injectable()
export class UsersInvitesService implements IUsersInvitesService {
  constructor(
    @Inject(MAIL_SERVICE) private mailService: IMailService,
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(INVITES_SERVICE) private readonly invitesService: IInvitesService,
    @Inject(USERS_INVITES_DAO) private usersInvitesDAO: IUsersInvitesDAO,
    @Inject(FITNESS_LOGGER_SERVICE)
    private readonly logger: FitnessLoggerService,
  ) {
    this.logger.setContext('UsersInvitesService');
  }

  async createAndSendUserInvite(userInvite: UserInvite): Promise<UserInvites> {
    const user = await this.usersService.saveUser(userInvite);

    const invite = await this.invitesService.saveInvite(inviteConfig.expiresAt);

    await this.createUserInvite({ inviteId: invite.id, userId: user.id });

    const dataInvite = await this.makeInvitePayload(user.email, invite.invite);

    return await this.sendInvite(dataInvite);
  }

  async makeInvitePayload(email: string, invite: string): Promise<SendMail> {
    const invitePayload: SendMail = {
      to: email,
      from: inviteConfig.from,
      subject: inviteConfig.subject,
      template: inviteConfig.template,
      context: await this.makeUrl(invite),
    };
    return invitePayload;
  }

  async sendInvite(mail: SendMail): Promise<UserInvites> {
    return await this.mailService.sendMail(mail);
  }

  async createUserInvite(userInvite: UserInvites): Promise<UserInvites> {
    const existingUserInvite: UserInvites = await this.findByUserId(
      userInvite.userId,
    );
    if (existingUserInvite) {
      return await this.updateUserInvite(userInvite);
    } else {
      return await this.usersInvitesDAO.save(userInvite);
    }
  }

  async findByUserId(id: number): Promise<UserInvites | null> {
    return await this.usersInvitesDAO.findByUserId(id);
  }

  async findById(id: number): Promise<UserInvites | null> {
    const existingUserInvite = await this.usersInvitesDAO.findById(id);
    if (!existingUserInvite) {
      const errorMessage = 'User Invite Not Found';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, 404);
    }
    return existingUserInvite;
  }

  async updateUserInvite(userInvite: UserInvites): Promise<UserInvites> {
    const existingUserInvite: UserInvites = await this.findByUserId(
      userInvite.userId,
    );
    if (!existingUserInvite) {
      const errorMessage = 'User Invite Not Found';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }
    try {
      await this.usersInvitesDAO.update(existingUserInvite.id, userInvite);
    } catch (e) {
      const errorMessage = 'Failed to update user invite!';
      this.logger.error(errorMessage, e);
      throw new HttpException(errorMessage, 500);
    }
    return await this.findById(existingUserInvite.id);
  }

  async makeUrl(token: string): Promise<string> {
    const HOST = configApp.appHost;
    const PORT = configApp.appPort;
    const PROTOCOL = configApp.appProtocol;
    return `${PROTOCOL}://${HOST}:${PORT}/auth/confirm?token=${token}`;
  }
}
