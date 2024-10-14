import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../../intercertors/logger.interceptor';

export const LOGGER_PROVIDERS = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
];
