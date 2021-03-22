import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheduleEntity } from './entity/shedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SheduleEntity])],
  exports: [TypeOrmModule],
})
export class SheduleModule {}
