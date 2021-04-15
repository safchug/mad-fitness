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
} from 'typeorm';
import { ISearchParams } from '../schedule/interface/searchParams.interface';

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

  async findByFilters(options: ISearchParams): Promise<Schedule[]> {
    const scheduleRepository = await this._getRepository(ScheduleEntity);
    const dat = options.byDate;
    const train = options.trainer;
    const time = options.byTime;
    const fromDate = new Date(dat);
    const untilDate = new Date(dat);
    untilDate.setDate(fromDate.getDate() + 1); //1 day
    const searchParams = {
      trainer: train,
      startDate: Between(fromDate, untilDate),
    };
    if (!train) {
      delete searchParams.trainer;
    }
    if (!dat) {
      delete searchParams.startDate;
    }
    console.log('search by:', searchParams);
    const found: Schedule[] = await scheduleRepository.find({
      relations: ['trainer', 'class'],
      where: [searchParams],
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
