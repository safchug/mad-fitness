import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleUsersEntity } from './entity/schedule_users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleUsersEntity])],
  exports: [TypeOrmModule],
})
export class ScheduleUsersModule {}
