import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from './entity/roles.entity';
import { Role } from './interface/roles.interface';

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
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {}

  async findOne(role: string): Promise<Role | null> {
    return await this.rolesRepository.findOne({ role });
  }

  async findById(id: number): Promise<Role | null> {
    return this.rolesRepository.findOne({ id });
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find({});
  }

  async saveRole(role: Role): Promise<Role> {
    return await this.rolesRepository.save(role);
  }
}
