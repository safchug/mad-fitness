import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Class } from './interface/classes.interface';
import { CLASSES_DAO, IClassesDAO } from '../DAO/classesDAO';

export const CLASSES_SERVICE = 'CLASSES SERVICE';
export interface IClassesService {
  findByLabel(role: string): Promise<Class | null>;
  findById(id: number): Promise<Class | null>;
  findAll(): Promise<Class[]>;
  saveClass(clas: Class): Promise<Class>;
  updateClass(id: number, clas: Class): Promise<Class>;
  removeClass(id: number): Promise<Class>;
}

@Injectable()
export class ClassesService implements IClassesService {
  constructor(@Inject(CLASSES_DAO) private readonly classesDAO: IClassesDAO) {}

  async findByLabel(label: string): Promise<Class | null> {
    return await this.classesDAO.findByLabel(label);
  }

  async findById(id: number): Promise<Class | null> {
    return await this.classesDAO.findById(id);
  }

  async findAll(): Promise<Class[]> {
    return await this.classesDAO.find();
  }

  async saveClass(clas: Class): Promise<Class> {
    return await this.classesDAO.save(clas);
  }

  async updateClass(id: number, clas: Class): Promise<Class> {
    const classFound: Class = await this.findById(id);
    if (!classFound) {
      throw new HttpException('Class Not Found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.classesDAO.update(id, clas);
    } catch (e) {
      throw new HttpException('Failed to update Class!', 500);
    }
    return await this.findById(classFound.id);
  }

  async removeClass(id: number): Promise<Class> {
    const classFound = await this.findById(id);
    if (!classFound) {
      throw new HttpException('Class not found!', 400);
    }
    await this.classesDAO.delete(id);
    return classFound;
  }
}
