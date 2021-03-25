import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesEntity } from './entity/classes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassesEntity])],
  exports: [TypeOrmModule],
})
export class ClassesModule {}
