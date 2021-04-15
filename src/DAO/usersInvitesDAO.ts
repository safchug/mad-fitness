import { IRepository, RepositoryDAO } from './repositoryDAO';
import { Injectable } from '@nestjs/common';
import { UsersInvitesEntity } from '../usersInvites/entity/usersInvites.entity';
import { UserInvites } from '../usersInvites/interface/userInvites.interface';
import { UpdateResult } from 'typeorm';

export const USERS_INVITES_DAO = 'USERS INVITES DAO';

export interface IUsersInvitesDAO extends IRepository<UserInvites> {
  save(invite: UserInvites): Promise<UserInvites>;
  findByUserId(userId: number): Promise<UserInvites>;
  update(id: number, userInvite: UserInvites): Promise<UpdateResult>;
}

@Injectable()
export class UserInvitesDAO
  extends RepositoryDAO<UsersInvitesEntity>
  implements IUsersInvitesDAO {
  async find(): Promise<UserInvites[]> {
    const invitesRepository = await this._getRepository(UsersInvitesEntity);
    return await invitesRepository.find();
  }

  async save(userInvite: UserInvites): Promise<UserInvites> {
    const invitesRepository = await this._getRepository(UsersInvitesEntity);
    return invitesRepository.save(userInvite);
  }

  async findById(id: number): Promise<UserInvites> {
    const invitesRepository = await this._getRepository(UsersInvitesEntity);
    return invitesRepository.findOne({ id });
  }

  async findByUserId(userId: number): Promise<UserInvites> {
    const invitesRepository = await this._getRepository(UsersInvitesEntity);
    return invitesRepository.findOne({ userId });
  }

  async update(id: number, userInvite: UserInvites): Promise<UpdateResult> {
    const invitesRepository = await this._getRepository(UsersInvitesEntity);
    return await invitesRepository.update(id, userInvite);
  }
}
