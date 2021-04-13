import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Role } from './interface/roles.interface';
import { ROLES_DAO, IRolesDAO } from '../DAO/rolesDAO';
import {
  FITNESS_LOGGER_SERVICE,
  FitnessLoggerService,
} from '../logger/logger.service';

export const ROLES_SERVICE = 'ROLES SERVICE';
export interface IRolesService {
  findOne(role: string): Promise<Role | null>;
  findById(id: number): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  saveRole(role: Role): Promise<Role>;
}

@Injectable()
export class RolesService implements IRolesService {
  constructor(
    @Inject(ROLES_DAO)
    private readonly rolesDAO: IRolesDAO,
    @Inject(FITNESS_LOGGER_SERVICE)
    private readonly logger: FitnessLoggerService,
  ) {
    this.logger.setContext('RolesService');
  }

  async findOne(role: string): Promise<Role | null> {
    return await this.rolesDAO.findByRole(role);
  }

  async findById(id: number): Promise<Role | null> {
    const roleFound = await this.rolesDAO.findById(id);
    if (!roleFound) {
      const errorMessage = 'Role Not Found';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, 404);
    }
    return roleFound;
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesDAO.find();
  }

  async saveRole(role: Role): Promise<Role> {
    return await this.rolesDAO.save(role);
  }
}
