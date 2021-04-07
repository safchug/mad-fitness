import { IRepository, RepositoryDAO } from './repositoryDAO';
import { Injectable } from '@nestjs/common';
import { UsersInvitesEntity } from '../usersInvites/entity/usersInvites.entity';

export const USERS_INVITES_DAO = 'USERS INVITES DAO';

export interface IUsersInvitesDAO extends IRepository<UsersInvitesEntity> {
  save(invite: UsersInvitesEntity): Promise<UsersInvitesEntity>;
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
}
