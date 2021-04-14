import { IRepository, RepositoryDAO } from './repositoryDAO';
import { InvitesEntity } from '../invites/entity/invites.entity';
import { Injectable } from '@nestjs/common';
import { Invite } from '../invites/interface/invites.interface';

export const INVITES_DAO = 'INVITES DAO';

export interface IInvitesDAO extends IRepository<Invite> {
  save(invite: Invite): Promise<Invite>;
}

@Injectable()
export class InvitesDAO
  extends RepositoryDAO<InvitesEntity>
  implements IInvitesDAO {
  async save(invite: Invite): Promise<Invite> {
    const invitesRepository = await this._getRepository(InvitesEntity);
    return await invitesRepository.save(invite);
  }

  async find(): Promise<Invite[]> {
    const invitesRepository = await this._getRepository(InvitesEntity);
    return await invitesRepository.find();
  }

  async findById(id: number): Promise<Invite> {
    const invitesRepository = await this._getRepository(InvitesEntity);
    return await invitesRepository.findOne({ id });
  }
}
