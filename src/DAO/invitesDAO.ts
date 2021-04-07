import { IRepository, RepositoryDAO } from './repositoryDAO';
import { InvitesEntity } from '../invites/entity/invites.entity';
import { Injectable } from '@nestjs/common';

export const INVITES_DAO = 'INVITES DAO';

export interface IInvitesDAO extends IRepository<InvitesEntity> {
  save(invite: InvitesEntity): Promise<InvitesEntity>;
}

@Injectable()
export class InvitesDAO
  extends RepositoryDAO<InvitesEntity>
  implements IInvitesDAO {
  async save(invite: InvitesEntity): Promise<InvitesEntity> {
    const invitesRepository = await this._getRepository(InvitesEntity);
    return invitesRepository.save(invite);
  }

  async find(): Promise<InvitesEntity[]> {
    const invitesRepository = await this._getRepository(InvitesEntity);
    return invitesRepository.find();
  }

  async findById(id: number): Promise<InvitesEntity> {
    const invitesRepository = await this._getRepository(InvitesEntity);
    return invitesRepository.findOne(id);
  }
}
