import { IRepository, RepositoryDAO } from './repositoryDAO';
import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../users/entity/users.entity';
import { User } from '../users/interface/users.interface';
import { UpdateResult, DeleteResult } from 'typeorm';

export const USERS_DAO = 'USERS DAO';
export interface IUsersDAO extends IRepository<User> {
  findByEmail(email: string): Promise<User>;
  findWithPassword(email: string): Promise<User>;
  findByFirstName(firstName: string): Promise<User>;
  save(user: User): Promise<User>;
  update(id: number, user: User): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}

@Injectable()
export class UsersDAO extends RepositoryDAO<UsersEntity> implements IUsersDAO {
  async findByFirstName(firstName: string): Promise<User> {
    const usersRepository = await this._getRepository(UsersEntity);
    return await usersRepository.findOne({ firstName });
  }

  async findByEmail(email: string): Promise<User> {
    const usersRepository = await this._getRepository(UsersEntity);
    return await usersRepository.findOne({ email });
  }

  async findWithPassword(email: string): Promise<User> {
    const usersRepository = await this._getRepository(UsersEntity);
    const found = await usersRepository
      .createQueryBuilder('user')
      .select('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
    return found;
  }

  async find(): Promise<User[]> {
    const usersRepository = await this._getRepository(UsersEntity);
    return await usersRepository.find({ relations: ['role'] });
  }

  async findById(id: number): Promise<User> {
    const usersRepository = await this._getRepository(UsersEntity);
    return await usersRepository.findOne(id, { relations: ['role'] });
  }

  async save(user: User): Promise<User> {
    const usersRepository = await this._getRepository(UsersEntity);
    return usersRepository.save(user);
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
