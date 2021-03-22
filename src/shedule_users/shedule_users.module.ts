import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheduleUsersEntity } from './entity/shedule_users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SheduleUsersEntity])],
  exports: [TypeOrmModule],
})
export class SheduleUsersModule {}
