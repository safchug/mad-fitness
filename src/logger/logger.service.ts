import { Injectable, LoggerService } from '@nestjs/common';
import * as pinoLogger from 'pino';

export const FITNESS_LOGGER_SERVICE = 'FITNESS LOGGER SERVICE';

@Injectable()
export class FitnessLoggerService implements LoggerService {
  private pino = pinoLogger({
    prettyPrint: true,
  });

  private context?: string;

  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  setContext(context: string): void {
    this.context = context;
  }

  error(message: any, trace?: string, context?: string): any {
    this.pino.error(this.getMessage(message, context || this.context));
    if (trace) {
      this.pino.error(trace);
    }
  }

  log(message: any, context?: string): any {
    this.pino.info(this.getMessage(message, context || this.context));
  }

  warn(message: any, context?: string): any {
    this.pino.warn(this.getMessage(message, context || this.context));
  }
}
