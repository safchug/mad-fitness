import { IRepository, RepositoryDAO } from './repositoryDAO';
import { Injectable } from '@nestjs/common';
import { UsersInvitesEntity } from '../usersInvites/entity/usersInvites.entity';
import { User } from '../users/interface/users.interface';
import { UpdateResult } from 'typeorm';

export const USERS_INVITES_DAO = 'USERS INVITES DAO';

export interface IUsersInvitesDAO extends IRepository<UsersInvitesEntity> {
  save(invite: UsersInvitesEntity): Promise<UsersInvitesEntity>;
  findByUser(user: User): Promise<UsersInvitesEntity>;
  update(id: number, userInvite: UsersInvitesEntity): Promise<UpdateResult>;
}

@Injectable()
export class UsersInvitesDAO
  extends RepositoryDAO<UsersInvitesEntity>
  implements IUsersInvitesDAO {
  async save(userInvite: UsersInvitesEntity): Promise<UsersInvitesEntity> {
    const invitesRepository = await this._getRepository(UsersInvitesEntity);
    return invitesRepository.save(userInvite);
  }

  async find(): Promise<UsersInvitesEntity[]> {
    const invitesRepository = await this._getRepository(UsersInvitesEntity);
    return invitesRepository.find();
  }

  async findById(id: number): Promise<UsersInvitesEntity> {
    const invitesRepository = await this._getRepository(UsersInvitesEntity);
    return invitesRepository.findOne(id);
  }

  async findByUser(user: User): Promise<UsersInvitesEntity> {
    const invitesRepository = await this._getRepository(UsersInvitesEntity);
    return invitesRepository.findOne({ user });
  }

  async update(
    id: number,
    userInvite: UsersInvitesEntity,
  ): Promise<UpdateResult> {
    const invitesRepository = await this._getRepository(UsersInvitesEntity);
    return invitesRepository.update(id, userInvite);
  }
}
