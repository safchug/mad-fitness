import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { INVITES_DAO, IInvitesDAO } from '../DAO/invitesDAO';
import { Invite } from './interface/invites.interface';

export const INVITES_SERVICE = 'INVITES SERVICE';
export interface IInvitesService {
  findById(id: number): Promise<Invite | null>;
  findAll(): Promise<Invite[]>;
  saveInvite(expiresAt: Date): Promise<Invite>;
}

@Injectable()
export class InvitesService implements IInvitesService {
  constructor(
    @Inject(INVITES_DAO)
    private readonly inviteDAO: IInvitesDAO,
  ) {}

  async findById(id: number): Promise<Invite | null> {
    return await this.inviteDAO.findById(id);
  }

  async findAll(): Promise<Invite[]> {
    return await this.inviteDAO.find();
  }

  async saveInvite(expiresAt: Date): Promise<Invite> {
    return await this.inviteDAO.save({ expiresAt: expiresAt });
  }
}
