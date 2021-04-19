import { IRepository, RepositoryDAO } from './repositoryDAO';
import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from '../schedule/entity/schedule.entity';
import { Schedule } from '../schedule/interface/schedule.interface';
import {
  UpdateResult,
  DeleteResult,
  Raw,
  Not,
  MoreThan,
  Between,
  MoreThanOrEqual,
  Like,
  OrderByCondition,
  FindOperator,
} from 'typeorm';
import { ISearchParams } from '../schedule/interface/searchParams.interface';
import { User } from '../users/interface/users.interface';

export const SCHEDULE_DAO = 'SCHEDULE DAO';
export interface IScheduleDAO extends IRepository<Schedule> {
  save(schedule: Schedule): Promise<Schedule>;
  update(id: number, schedule: Schedule): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
  findSchedule(schedule: Schedule): Promise<Schedule>;
  findByFilters(options: ISearchParams): Promise<Schedule[]>;
}

@Injectable()
export class ScheduleDAO
  extends RepositoryDAO<ScheduleEntity>
  implements IScheduleDAO {
  async find(): Promise<Schedule[]> {
    const scheduleRepository = await this._getRepository(ScheduleEntity);
    return await scheduleRepository.find({ relations: ['trainer', 'class'] });
  }

  private prepareSort(options: ISearchParams): OrderByCondition {
    const orderParams: OrderByCondition = {};
    if (options.sort && options.sortBy) {
      orderParams[options.sortBy] = options.sort === 'ASC' ? 'ASC' : 'DESC';
    }
    return orderParams;
  }
  private prepareFilters(
    options: ISearchParams,
  ): { trainer: User; startDate: FindOperator<Date> } {
    const searchParams = {
      trainer: options.trainer,
      startDate: Between(options.fromDate, options.untilDate),
    };
    if (!options.trainer) {
      delete searchParams.trainer;
    }
    if (!options.fromDate || !options.untilDate) {
      delete searchParams.startDate;
    }
    return searchParams;
  }

  async findByFilters(options: ISearchParams): Promise<Schedule[]> {
    const scheduleRepository = await this._getRepository(ScheduleEntity);
    const orderParams: OrderByCondition = this.prepareSort(options);
    const searchParams = this.prepareFilters(options);

    const found: Schedule[] = await scheduleRepository.find({
      relations: ['trainer', 'class'],
      where: [searchParams],
      order: orderParams,
    });
    return found;
  }

  async findById(id: number): Promise<Schedule> {
    const scheduleRepository = await this._getRepository(ScheduleEntity);
    return await scheduleRepository.findOne(id, {
      relations: ['trainer', 'class'],
    });
  }

  async findSchedule(schedule: Schedule): Promise<Schedule> {
    const scheduleRepository = await this._getRepository(ScheduleEntity);
    return await scheduleRepository.findOne(schedule);
  }

  async save(schedule: Schedule): Promise<Schedule> {
    const scheduleRepository = await this._getRepository(ScheduleEntity);
    return await scheduleRepository.save(schedule);
  }

  async update(id: number, schedule: Schedule): Promise<UpdateResult> {
    const scheduleRepository = await this._getRepository(ScheduleEntity);
    return await scheduleRepository.update(id, schedule);
  }

  async delete(id: number): Promise<DeleteResult> {
    const scheduleRepository = await this._getRepository(ScheduleEntity);
    const result = await scheduleRepository.delete(id);
    return result;
  }
}
