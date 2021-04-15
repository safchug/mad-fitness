import { Inject, Injectable } from '@nestjs/common';
import { User } from '../mail/interface/user.interface';
import {
  FITNESS_LOGGER_SERVICE,
  FitnessLoggerService,
} from '../logger/logger.service';
import { MAIL_SERVICE, IMailService } from '../mail/mail.service';
import { IUsersInvitesDAO, USERS_INVITES_DAO } from '../DAO/usersInvitesDAO';
import { USERS_SERVICE, IUsersService } from '../users/users.service';
import { UsersInvitesEntity } from './entity/usersInvites.entity';
import { InvitesEntity } from '../invites/entity/invites.entity';
import { UserInvites } from './interface/userInvites.interface';
import { INVITES_SERVICE, IInvitesService } from '../invites/invites.service';
import { inviteConfig } from '../config/mail/invite/invite.config';
import { Invite } from '../invites/interface/invites.interface';

export const USERS_INVITES_SERVICE = 'USERS INVITES SERVICE';

export interface IUsersInvitesService {
  createAndSendUserInvite(user: User): Promise<UserInvites>;
  sendInvite(user: User, token: string): Promise<UserInvites>;
  createInvite(expiresAt: Date): Promise<Invite>;
  createUserInvite(inviteId: number, userId: number): Promise<UserInvites>;
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

  async createAndSendUserInvite(newUser: User): Promise<UserInvites> {
    const user = await this.usersService.saveUser(newUser);

    const invite = await this.createInvite(inviteConfig.expiresAt);

    const userInvite = await this.createUserInvite(invite.id, user.id);

    return await this.sendInvite(user, invite.invite);
  }

  async sendInvite(newUser: User, token: string): Promise<UserInvites> {
    return await this.mailService.sendMail(newUser, token);
  }

  async createInvite(expiresAt: Date): Promise<Invite> {
    const invite: InvitesEntity = new InvitesEntity();
    invite.expiresAt = expiresAt;
    return await this.invitesService.saveInvite(invite);
  }

  async createUserInvite(
    inviteId: number,
    userId: number,
  ): Promise<UserInvites> {
    const userInvite: UsersInvitesEntity = new UsersInvitesEntity();
    userInvite.inviteId = inviteId;
    userInvite.userId = userId;
    return await this.usersInvitesDAO.save(userInvite);
  }
}
