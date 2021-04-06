import { IRepository, RepositoryDAO } from './repositoryDAO';
import { Injectable } from '@nestjs/common';
import { RolesEntity } from '../roles/entity/roles.entity';
import { Role } from '../roles/interface/roles.interface';

export const ROLES_DAO = 'ROLES DAO';
export interface IRolesDAO extends IRepository<Role> {
  findByRole(role: string): Promise<Role>;
  save(role: Role): Promise<Role>;
}

@Injectable()
export class RolesDAO extends RepositoryDAO<RolesEntity> implements IRolesDAO {
  async find(): Promise<Role[]> {
    const rolesRepository = await this._getRepository(RolesEntity);
    return await rolesRepository.find();
  }

  async findByRole(role: string): Promise<Role> {
    const rolesRepository = await this._getRepository(RolesEntity);
    return await rolesRepository.findOne({ role });
  }

  async findById(id: number): Promise<Role> {
    const rolesRepository = await this._getRepository(RolesEntity);
    return await rolesRepository.findOne({ id });
  }

  async save(role: Role): Promise<Role> {
    const rolesRepository = await this._getRepository(RolesEntity);
    return await rolesRepository.save(role);
  }
}
