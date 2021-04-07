import { Module } from '@nestjs/common';
import { FitnessLoggerService } from './logger.service';

@Module({
  providers: [FitnessLoggerService],
  exports: [FitnessLoggerService],
})
export class LoggerModule {}
