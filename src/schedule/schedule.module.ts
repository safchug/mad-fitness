import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './entity/schedule.entity';
import { SCHEDULE_SERVICE } from './schedule.service';
import { scheduleService, scheduleDAO } from '../config/configDi';
import { ScheduleController } from './schedule.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([ScheduleEntity])],
  providers: [scheduleService, scheduleDAO],
  controllers: [ScheduleController],
  exports: [SCHEDULE_SERVICE],
})
export class ScheduleModule {}
