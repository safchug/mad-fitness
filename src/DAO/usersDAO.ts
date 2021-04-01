import { IRepository, RepositoryDAO } from './repositoryDAO';
import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../users/entity/users.entity';
import { User } from '../users/interface/users.interface';
import { UpdateResult, DeleteResult } from 'typeorm';

export const USERS_DAO = 'USERS DAO';
export interface IUsersDAO extends IRepository<UsersEntity> {
  findOne(email: string): Promise<UsersEntity>;
  findByFirstName(firstName: string): Promise<UsersEntity>;
  save(user: User): Promise<UsersEntity>;
  update(id: number, user: User): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}

@Injectable()
export class UsersDAO extends RepositoryDAO<UsersEntity> implements IUsersDAO {
  async findByFirstName(firstName: string): Promise<UsersEntity> {
    const usersRepository = await this._getRepository(UsersEntity);
    return await usersRepository.findOne({ firstName });
  }

  async findOne(email: string): Promise<UsersEntity> {
    const usersRepository = await this._getRepository(UsersEntity);
    return await usersRepository.findOne({ email });
  }

  async find(): Promise<UsersEntity[]> {
    const usersRepository = await this._getRepository(UsersEntity);
    return await usersRepository.find({ relations: ['role'] });
  }

  async findById(id: number): Promise<UsersEntity> {
    const usersRepository = await this._getRepository(UsersEntity);
    return await usersRepository.findOne(id, { relations: ['role'] });
  }

  async save(user: User): Promise<UsersEntity> {
    const usersRepository = await this._getRepository(UsersEntity);
    return await usersRepository.save(user);
  }

  async update(id: number, user: User): Promise<UpdateResult> {
    const usersRepository = await this._getRepository(UsersEntity);
    return await usersRepository.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    const usersRepository = await this._getRepository(UsersEntity);
    const result = await usersRepository.delete(id);
    return result;
  }
}
