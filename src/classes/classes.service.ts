import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Class } from './interface/classes.interface';
import { CLASSES_DAO, IClassesDAO } from '../DAO/classesDAO';
import {
  FITNESS_LOGGER_SERVICE,
  FitnessLoggerService,
} from '../logger/logger.service';

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
  constructor(
    @Inject(CLASSES_DAO) private readonly classesDAO: IClassesDAO,
    @Inject(FITNESS_LOGGER_SERVICE)
    private readonly logger: FitnessLoggerService,
  ) {
    this.logger.setContext('ClassesService');
  }

  async findByLabel(label: string): Promise<Class | null> {
    return await this.classesDAO.findByLabel(label);
  }

  async findById(id: number): Promise<Class | null> {
    const classFound = await this.classesDAO.findById(id);
    if (!classFound) {
      const errorMessage = 'Class Not Found';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, 404);
    }
    return classFound;
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
      const errorMessage = 'Class Not Found!';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }
    try {
      await this.classesDAO.update(id, clas);
    } catch (e) {
      const errorMessage = 'Failed to update Class!';
      this.logger.error(errorMessage, e);
      throw new HttpException(errorMessage, 500);
    }
    return await this.findById(classFound.id);
  }

  async removeClass(id: number): Promise<Class> {
    const classFound = await this.findById(id);
    if (!classFound) {
      const errorMessage = 'Class not found!';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, 404);
    }
    await this.classesDAO.delete(id);
    return classFound;
  }
}
