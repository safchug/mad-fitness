import { Inject, Injectable } from '@nestjs/common';
//import { User } from '../users/interface/users.interface';
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

export const USERS_INVITES_SERVICE = 'USERS INVITES SERVICE';

export interface IUsersInvitesService {
  makeUserInvite(user: User): Promise<UserInvites>;
  sendInvite(user: User, token: string): Promise<UserInvites>;
}

// @Injectable()
// export class UsersInvitesService {
//   constructor(private mailService: MailService) {}
//
//   async signUp(user: User) {
//     const token = Math.floor(1000 + Math.random() * 9000).toString();
//     // create user in db
//     // ...
//     // send confirmation mail
//     await this.mailService.sendUserConfirmation(user, token);
//   }
// }

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

  async makeUserInvite(user: User): Promise<UserInvites> {
    const userInvite: UsersInvitesEntity = new UsersInvitesEntity();
    const invite: InvitesEntity = new InvitesEntity();

    await this.usersService.saveUser(user);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    invite.expiresAt = expiresAt;

    await this.invitesService.saveInvite(invite);

    userInvite.inviteId = invite.id;
    userInvite.userId = user.id;
    await this.usersInvitesDAO.save(userInvite);

    return await this.sendInvite(user, invite.invite);
  }

  async sendInvite(newUser: User, token: string): Promise<UserInvites> {
    return await this.mailService.sendMail(newUser, token);
  }
}
