import { Inject, Injectable } from '@nestjs/common';
import { User } from '../users/interface/users.interface';
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
  //sendInvite(userData: UserDataDto): Promise<UserResponseDto>;
  makeUserInvite(user: User): Promise<UserInvites>;
  //makeUserInvite(inviteId: number, userId: number): Promise<User>;
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
    @Inject(MAIL_SERVICE) private emailService: IMailService,
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
    return this.usersInvitesDAO.save(userInvite);
  }

  // async sendInvite(userData: UserDataDto): Promise<UserResponseDto> {
  //   const userThatExists = await this.getUserIfExists(userData.email);
  //
  //   let userInvite;
  //   try {
  //     if (userThatExists) {
  //       if (userThatExists.active)
  //         throw new HttpException(
  //           'User already exists',
  //           HttpStatus.BAD_REQUEST,
  //         );
  //       console.log('User exists');
  //       userInvite = await this.updateUserIvite(userThatExists);
  //     } else {
  //       console.log('User doesn`t exist');
  //       console.log('userData', userData);
  //       userInvite = await this.makeUserInvite(userData);
  //     }
  //
  //     const { user, invite } = userInvite;
  //
  //     const token = this.jwtService.sign({
  //       email: user.email,
  //       userId: user.id,
  //       invite,
  //     });
  //
  //     await this.emailService.sendInvite(
  //       { name: user.firstName, email: user.email },
  //       token,
  //     );
  //   } catch (err) {
  //     console.log(err);
  //     return { message: 'FAILURE', err };
  //   }
  //
  //   return { message: 'SUCCESS' };
  // }
}
