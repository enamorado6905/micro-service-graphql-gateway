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
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
          ({ timestamp, level, message, context, meta }) => {
            const logMessage = `${timestamp} [${level}] ${context ? '[' + context + ']' : ''} ${message}`;
            if (meta) {
              return `${logMessage} | Data: ${JSON.stringify(meta)}`;
            }
            return logMessage;
          },
        ),
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

  /**
   * Log a message with optional context and object data.
   * @param message - The log message.
   * @param context - The context in which the log is occurring.
   * @param data - The object to log.
   */
  public log(message: string, context?: string, data?: object) {
    this.logger.info(message, { context, meta: data });
  }

  public error(
    message: string,
    trace?: string,
    context?: string,
    data?: object,
  ) {
    this.logger.error(message, { trace, context, meta: data });
  }

  public warn(message: string, context?: string, data?: object) {
    this.logger.warn(message, { context, meta: data });
  }

  public debug(message: string, context?: string, data?: object) {
    this.logger.debug(message, { context, meta: data });
  }

  public info(message: string, context?: string, data?: object) {
    this.logger.info(message, { context, meta: data });
  }
}
