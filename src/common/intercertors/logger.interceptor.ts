import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LoggerClass } from '../class/operation/logger.class';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerClass) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Switch to GraphQL execution context
    const gqlCtx = GqlExecutionContext.create(context);
    const info = gqlCtx.getInfo(); // GraphQL query/mutation info

    // Log the GraphQL operation (query/mutation) and the arguments
    this.logger.info(`GraphQL Operation: ${info.fieldName}`);

    return next.handle().pipe(
      tap(() => {
        // Optionally log after the operation is processed
        this.logger.info(`Operation ${info.fieldName} successfully processed`);
      }),
    );
  }
}
