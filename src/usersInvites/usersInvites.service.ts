import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { getConnection, getRepository } from 'typeorm';
import { UsersInvitesEntity } from './entity/usersInvites.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { InvitesEntity } from '../invites/entity/invites.entity';
import { JwtService } from '@nestjs/jwt';
import {
  EMAIL_SERVICE,
  EmailService,
  IEmailService,
} from '../email/email.service';
import { RolesEntity } from '../roles/entity/roles.entity';
import { UserDataDto } from './dto/userData.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import { IUsersDAO, USERS_DAO } from '../DAO/usersDAO';
import { IUsersInvitesDAO, USERS_INVITES_DAO } from '../DAO/usersInvitesDAO';
import { IRolesDAO, ROLES_DAO } from '../DAO/rolesDAO';
import { IInvitesDAO, INVITES_DAO } from '../DAO/invitesDAO';
import { User } from '../users/interface/users.interface';
import { Role } from '../roles/interface/roles.interface';

export const USERS_INVIES_SERVICE = 'USERS INVIES SERVICE';

export interface IUsersInvitesService {
  sendInvite(userData: UserDataDto): UserResponseDto;
  makeUserInvite(): UsersInvitesEntity;
  getUserIfExists(email: string): Promise<User>;
  saveUser(userData: UserDataDto): UsersEntity;
  specifyRole(id: number): Role;
  updateUserIvite(userData: UserDataDto): UsersInvitesEntity;
  saveInvite(userData: UserDataDto): InvitesEntity;
  saveUserInvite(): UsersInvitesEntity;
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
    user.firstName = data.firstName;
    user.lastName = data.lastName;
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

  getUserIfExists(email: string): Promise<User> {
    return this.usersDAO.findByEmail(email);
  }

  makeUserInvite(): UsersInvitesEntity {
    return undefined;
  }

  saveUser(userData: UserDataDto): UsersEntity {
    return undefined;
  }

  saveUserInvite(userData: UserDataDto): UsersInvitesEntity {
    return undefined;
  }

  async sendInvite(userData: UserDataDto): UserResponseDto {
    const user = await this.getUserIfExists(userData.email);
    let userInvite;
    if (user) {
      userInvite = await this.updateUserIvite(user);
    } else {
      userInvite = await this.makeUserInvite(userData);
    }
  }

  async specifyRole(id: number): Promise<Role> {
    const role: Role = await this.rolesDAO.findById(id);

    if (!role)
      throw new HttpException('Bad request data', HttpStatus.BAD_REQUEST);

    return role;
  }

  async updateUserIvite(userData: UserDataDto): UsersInvitesEntity {
    return this.invitesDAO.update();
  }
}
