import { Injectable, LoggerService } from '@nestjs/common';
import * as pinoLogger from 'pino';
const pino = pinoLogger({
  prettyPrint: true,
});

@Injectable()
export class FitnessLoggerService implements LoggerService {
  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  error(message: any, trace?: string, context?: string): any {
    pino.error(this.getMessage(message, context));
    if (trace) {
      pino.error(trace);
    }
  }

  log(message: any, context?: string): any {
    pino.info(this.getMessage(message, context));
  }

  warn(message: any, context?: string): any {
    pino.warn(this.getMessage(message, context));
  }
}
