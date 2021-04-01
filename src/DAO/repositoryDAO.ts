import { Repository, ObjectType, getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';

export interface IRepository<T> {
  find(): Promise<T[]>;
  findById(id: number): Promise<T>;
}

@Injectable()
export abstract class RepositoryDAO<T> {
  protected async _getRepository(
    entity: ObjectType<T>,
  ): Promise<Repository<T>> {
    return getRepository(entity);
  }
}
