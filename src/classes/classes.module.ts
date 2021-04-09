import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesEntity } from './entity/classes.entity';
import { CLASSES_SERVICE } from './classes.service';
import { classesService, classesDAO } from '../config/configDi';
import { ClassesController } from './classes.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([ClassesEntity])],
  providers: [classesService, classesDAO],
  controllers: [ClassesController],
  exports: [CLASSES_SERVICE],
})
export class ClassesModule {}
