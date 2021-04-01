import { Injectable, Inject } from '@nestjs/common';
import { Role } from './interface/roles.interface';
import { ROLES_DAO, IRolesDAO } from '../DAO/rolesDAO';

export const ROLES_SERVICE = 'ROLES SERVICE';
export interface IRolesService {
  findOne(role: string): Promise<Role | null>;
  findById(id: number): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  saveRole(role: Role): Promise<Role>;
}

@Injectable()
export class RolesService implements IRolesService {
  constructor(@Inject(ROLES_DAO) private readonly rolesDAO: IRolesDAO) {}

  async findOne(role: string): Promise<Role | null> {
    return await this.rolesDAO.findOne(role);
  }

  async findById(id: number): Promise<Role | null> {
    return await this.rolesDAO.findById(id);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesDAO.find();
  }

  async saveRole(role: Role): Promise<Role> {
    return await this.rolesDAO.save(role);
  }
}
