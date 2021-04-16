import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserInvite } from '../mail/interface/user.interface';
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
import { Invite } from '../invites/interface/invites.interface';

export const USERS_INVITES_SERVICE = 'USERS INVITES SERVICE';

export interface IUsersInvitesService {
  createAndSendUserInvite(user: UserInvite): Promise<UserInvites>;
  sendInvite(user: UserInvite, token: string): Promise<UserInvites>;
  createInvite(expiresAt: Date): Promise<Invite>;
  createUserInvite(userInvite: UserInvites): Promise<UserInvites>;
  updateUserInvite(userInvite: UserInvites): Promise<UserInvites>;
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

  async createAndSendUserInvite(newUser: UserInvite): Promise<UserInvites> {
    const user = await this.createUser(newUser);

    const invite = await this.createInvite(inviteConfig.expiresAt);

    await this.createUserInvite({ inviteId: invite.id, userId: user.id });

    return await this.sendInvite(user, invite.invite);
  }

  async sendInvite(newUser: UserInvite, token: string): Promise<UserInvites> {
    return await this.mailService.sendMail(newUser, token);
  }

  async createInvite(expiresAt: Date): Promise<Invite> {
    return await this.invitesService.saveInvite(expiresAt);
  }

  async createUser(newUser: UserInvite): Promise<UserInvite> {
    return await this.usersService.saveUser(newUser);
  }

  async createUserInvite(userInvite: UserInvites): Promise<UserInvites> {
    const foundUserInvite: UserInvites = await this.findByUserId(
      userInvite.userId,
    );
    if (foundUserInvite) {
      return await this.updateUserInvite(userInvite);
    } else {
      return await this.usersInvitesDAO.save(userInvite);
    }
  }

  async findByUserId(id: number): Promise<UserInvites | null> {
    return await this.usersInvitesDAO.findByUserId(id);
  }

  async findById(id: number): Promise<UserInvites | null> {
    const userInviteFound = await this.usersInvitesDAO.findById(id);
    if (!userInviteFound) {
      const errorMessage = 'User Invite Not Found';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, 404);
    }
    return userInviteFound;
  }

  async updateUserInvite(userInvite: UserInvites): Promise<UserInvites> {
    const userInviteFound: UserInvites = await this.findByUserId(
      userInvite.userId,
    );
    if (!userInvite) {
      const errorMessage = 'User Invite Not Found';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }
    try {
      await this.usersInvitesDAO.update(userInviteFound.id, userInvite);
    } catch (e) {
      const errorMessage = 'Failed to update user invite!';
      this.logger.error(errorMessage, e);
      throw new HttpException(errorMessage, 500);
    }
    return await this.findById(userInviteFound.id);
  }
}
