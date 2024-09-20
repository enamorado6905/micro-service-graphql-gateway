import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerClass implements NestLoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: () => {
            const date = new Date();
            // Format the date to "YYYY-MM-DD HH:mm:ss" without the timezone
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // months are 0-indexed
            const day = String(date.getUTCDate()).padStart(2, '0');
            const hours = String(date.getUTCHours()).padStart(2, '0');
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          },
        }),
        winston.format.printf(({ timestamp, level, message, context }) => {
          return `${timestamp} [${level}] ${context ? '[' + context + ']' : ''} ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
          dirname: 'logs', // Directory to save log files
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  public log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  /**
   * Logs an error message with optional trace and context.
   *
   * @param message - The error message to be logged.
   * @param trace - (Optional) The stack trace associated with the error.
   * @param context - (Optional) The context or identifier for the error.
   *
   * @example error('Failed to fetch data', err.stack, 'data-fetching');
   *
   * @returns {void} - This method does not return a value.
   */
  public error(
    message: string | string[],
    trace?: string,
    context?: string,
  ): void {
    this.logger.error(`Exception: ${message}`, { trace, context });
  }

  public warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  public debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  public verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
