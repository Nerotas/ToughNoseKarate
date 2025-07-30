import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logger: ConsoleLogger;
  private appName = `${process.env.APP_NAME}` || 'ToghNoseKarateAPI';
  constructor() {
    super();
    this.logger = new ConsoleLogger(this.appName);
  }
  info(message: string): void {
    this.logger.log(message);
  }
  warn(message: string): void {
    this.logger.warn(message);
  }
  error(message: string): void {
    this.logger.error(message);
  }
  debug(message: string): void {
    this.logger.debug(message);
  }
}
