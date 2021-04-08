import { Injectable, LoggerService } from '@nestjs/common';
import * as pinoLogger from 'pino';

@Injectable()
export class FitnessLoggerService implements LoggerService {
  private pino = pinoLogger({
    prettyPrint: true,
  });

  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  error(message: any, trace?: string, context?: string): any {
    this.pino.error(this.getMessage(message, context));
    if (trace) {
      this.pino.error(trace);
    }
  }

  log(message: any, context?: string): any {
    this.pino.info(this.getMessage(message, context));
  }

  warn(message: any, context?: string): any {
    this.pino.warn(this.getMessage(message, context));
  }
}
