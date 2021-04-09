import { Module } from '@nestjs/common';
import { fitnessLoggerService } from '../config/configDi';
import { FITNESS_LOGGER_SERVICE } from '../logger/logger.service';

@Module({
  providers: [fitnessLoggerService],
  exports: [FITNESS_LOGGER_SERVICE],
})
export class LoggerModule {}
