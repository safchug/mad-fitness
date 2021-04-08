import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersInvitesEntity } from './entity/usersInvites.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { InvitesEntity } from '../invites/entity/invites.entity';
import { JwtService } from '@nestjs/jwt';
import {
  EMAIL_SERVICE,
  EmailService,
  IEmailService,
} from '../email/email.service';
import { UserDataDto } from './dto/userData.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import { IUsersDAO, USERS_DAO } from '../DAO/usersDAO';
import { IUsersInvitesDAO, USERS_INVITES_DAO } from '../DAO/usersInvitesDAO';
import { IRolesDAO, ROLES_DAO } from '../DAO/rolesDAO';
import { IInvitesDAO, INVITES_DAO } from '../DAO/invitesDAO';
import { User } from '../users/interface/users.interface';
import { Role } from '../roles/interface/roles.interface';

export const USERS_INVITES_SERVICE = 'USERS INVITES SERVICE';

export interface IUsersInvitesService {
  sendInvite(userData: UserDataDto): Promise<UserResponseDto>;
  makeUserInvite(userData: UserDataDto): Promise<UsersInvitesEntity>;
  getUserIfExists(email: string): Promise<User>;
  makeUser(userData: UserDataDto): Promise<User>;
  specifyRole(id: number): Promise<Role>;
  updateUserIvite(user: User): Promise<UsersInvitesEntity>;
}

@Injectable()
export class UsersInvitesService implements IUsersInvitesService {
  constructor(
    @Inject(EMAIL_SERVICE) private emailService: IEmailService,
    private readonly jwtService: JwtService,
    @Inject(USERS_DAO) private usersDAO: IUsersDAO,
    @Inject(ROLES_DAO) private rolesDAO: IRolesDAO,
    @Inject(INVITES_DAO) private invitesDAO: IInvitesDAO,
    @Inject(USERS_INVITES_DAO) private usersInvitesDAO: IUsersInvitesDAO,
  ) {}

  getUserIfExists(email: string): Promise<User> {
    return this.usersDAO.findByEmail(email);
  }

  async makeUserInvite(userData: UserDataDto): Promise<UsersInvitesEntity> {
    const userInvite: UsersInvitesEntity = new UsersInvitesEntity();

    const user: User = await this.makeUser(userData);

    const invite = new InvitesEntity();

    const now = new Date();
    //TODO: raise time duration in props of the method
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    invite.expiresAt = expiresAt;

    await this.invitesDAO.save(invite);

    userInvite.invite = invite;
    userInvite.user = user;
    return this.usersInvitesDAO.save(userInvite);
  }

  async makeUser(userData: UserDataDto): Promise<User> {
    const newUser = new UsersEntity();
    newUser.email = userData.email;
    newUser.firstName = userData.firstName;
    newUser.lastName = userData.lastName;
    newUser.password = 'secret';
    newUser.role = await this.specifyRole(userData.roleId);
    return this.usersDAO.save(newUser);
  }

  async sendInvite(userData: UserDataDto): Promise<UserResponseDto> {
    const userThatExists = await this.getUserIfExists(userData.email);

    let userInvite;
    try {
      if (userThatExists) {
        if (userThatExists.active)
          throw new HttpException(
            'User already exists',
            HttpStatus.BAD_REQUEST,
          );
        console.log('User exists');
        userInvite = await this.updateUserIvite(userThatExists);
      } else {
        console.log('User doesn`t exist');
        console.log('userData', userData);
        userInvite = await this.makeUserInvite(userData);
      }

      const { user, invite } = userInvite;

      const token = this.jwtService.sign({
        email: user.email,
        userId: user.id,
        invite,
      });

      await this.emailService.sendInvite(
        { name: user.firstName, email: user.email },
        token,
      );
    } catch (err) {
      console.log(err);
      return { message: 'FAILURE', err };
    }

    return { message: 'SUCCESS' };
  }

  async specifyRole(id: number): Promise<Role> {
    const role: Role = await this.rolesDAO.findById(id);

    if (!role)
      throw new HttpException('roleId is required', HttpStatus.BAD_REQUEST);

    return role;
  }

  async updateUserIvite(user: User): Promise<UsersInvitesEntity> {
    const userInvite = await this.usersInvitesDAO.findByUser(user);
    const invite = new InvitesEntity();
    const now = new Date();
    //TODO: raise time duration in props of the method
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    invite.expiresAt = expiresAt;
    await this.invitesDAO.save(invite);

    userInvite.invite = invite;
    this.usersInvitesDAO.update(userInvite.id, userInvite);

    return this.usersInvitesDAO.findById(userInvite.id);
  }
}
