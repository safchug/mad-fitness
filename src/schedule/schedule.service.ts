import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Schedule } from './interface/schedule.interface';
import { SCHEDULE_DAO, IScheduleDAO } from '../DAO/scheduleDAO';
import { IUsersService, USERS_SERVICE } from '../users/users.service';
import { IClassesService, CLASSES_SERVICE } from '../classes/classes.service';
import {
  FITNESS_LOGGER_SERVICE,
  FitnessLoggerService,
} from '../logger/logger.service';

export const SCHEDULE_SERVICE = 'SCHEDULE SERVICE';
export interface IScheduleService {
  findById(id: number): Promise<Schedule | null>;
  findAll(): Promise<Schedule[]>;
  saveSchedule(schedule: Schedule): Promise<Schedule>;
  updateSchedule(id: number, schedule: Schedule): Promise<Schedule>;
  removeSchedule(id: number): Promise<Schedule>;
  findSchedule(schedule: Schedule): Promise<Schedule>;
}

@Injectable()
export class ScheduleService implements IScheduleService {
  constructor(
    @Inject(SCHEDULE_DAO) private readonly scheduleDAO: IScheduleDAO,
    @Inject(FITNESS_LOGGER_SERVICE)
    private readonly logger: FitnessLoggerService,
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(CLASSES_SERVICE) private readonly classesService: IClassesService,
  ) {
    this.logger.setContext('ScheduleService');
  }

  async findById(id: number): Promise<Schedule | null> {
    return await this.scheduleDAO.findById(id);
  }

  async findAll(): Promise<Schedule[]> {
    return await this.scheduleDAO.find();
  }

  async findSchedule(schedule: Schedule): Promise<Schedule> {
    return await this.scheduleDAO.findSchedule(schedule);
  }

  async validateSchedule(schedule: Schedule) {
    const userActive = await this.usersService.isActive(schedule.trainer);
    if (!userActive) {
      const errorMessage = 'Trainer inactive!';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const userTrainer = await this.usersService.isTrainer(schedule.trainer);
    if (!userTrainer) {
      const errorMessage = 'User is not a trainer!';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const classFound = await this.classesService.findClass(schedule.class);
    if (!classFound) {
      const errorMessage = 'Class not found!';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async saveSchedule(schedule: Schedule): Promise<Schedule> {
    const scheduleFound: Schedule = await this.findSchedule(schedule);
    if (scheduleFound) {
      const errorMessage = 'Schedule already exists!';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    await this.validateSchedule(schedule);
    return await this.scheduleDAO.save(schedule);
  }

  async updateSchedule(id: number, schedule: Schedule): Promise<Schedule> {
    const scheduleFound: Schedule = await this.findById(id);
    if (!scheduleFound) {
      const errorMessage = 'Schedule Not Found!';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }

    await this.validateSchedule(schedule);
    try {
      await this.scheduleDAO.update(id, schedule);
    } catch (e) {
      const errorMessage = 'Failed to update Schedule!';
      this.logger.error(errorMessage, e);
      throw new HttpException(errorMessage, 500);
    }
    return await this.findById(scheduleFound.id);
  }

  async removeSchedule(id: number): Promise<Schedule> {
    const scheduleFound = await this.findById(id);
    if (!scheduleFound) {
      const errorMessage = 'Schedule not found!';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, 400);
    }
    await this.scheduleDAO.delete(id);
    return scheduleFound;
  }
}
