import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleUsersEntity } from './entity/scheduleUsers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleUsersEntity])],
  exports: [TypeOrmModule],
})
export class ScheduleUsersModule {}
