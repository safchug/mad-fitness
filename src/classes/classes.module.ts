import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './entity/class.entity';

@Module({
   imports: [TypeOrmModule.forFeature([ClassEntity])],
   exports: [TypeOrmModule],
})
export class ClassesModule {}
