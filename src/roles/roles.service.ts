import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from './entity/roles.entity';
import { Role } from './interface/roles.interface';

@Injectable()
export class RolesService {
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
