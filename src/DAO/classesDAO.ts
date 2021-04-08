import { IRepository, RepositoryDAO } from './repositoryDAO';
import { Injectable } from '@nestjs/common';
import { ClassesEntity } from '../classes/entity/classes.entity';
import { Class } from '../classes/interface/classes.interface';
import { UpdateResult, DeleteResult } from 'typeorm';

export const CLASSES_DAO = 'CLASSES DAO';
export interface IClassesDAO extends IRepository<Class> {
  findByLabel(label: string): Promise<Class>;
  save(clas: Class): Promise<Class>;
  update(id: number, clas: Class): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}

@Injectable()
export class ClassesDAO
  extends RepositoryDAO<ClassesEntity>
  implements IClassesDAO {
  async find(): Promise<Class[]> {
    const classesRepository = await this._getRepository(ClassesEntity);
    return await classesRepository.find();
  }

  async findByLabel(label: string): Promise<Class> {
    const classesRepository = await this._getRepository(ClassesEntity);
    return await classesRepository.findOne({ label });
  }

  async findById(id: number): Promise<Class> {
    const classesRepository = await this._getRepository(ClassesEntity);
    return await classesRepository.findOne({ id });
  }

  async save(clas: Class): Promise<Class> {
    const classesRepository = await this._getRepository(ClassesEntity);
    return await classesRepository.save(clas);
  }

  async update(id: number, clas: Class): Promise<UpdateResult> {
    const classesRepository = await this._getRepository(ClassesEntity);
    return await classesRepository.update(id, clas);
  }

  async delete(id: number): Promise<DeleteResult> {
    const classesRepository = await this._getRepository(ClassesEntity);
    const result = await classesRepository.delete(id);
    return result;
  }
}
