import { Injectable, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

/**
 * An interceptor for NestJS that adds a timeout to the request handling.
 */
@Injectable()
export class TimeOutInterceptor implements NestInterceptor {
  /**
   * Intercepts a request and applies a timeout.
   *
   * @param context - The context of the execution, providing details about the current request.
   * @param next - A `CallHandler` which allows to control the flow of the request handling.
   * @returns An `Observable` that either completes or errors out if the timeout is exceeded.
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Handle the request and apply a timeout of 2000000 milliseconds (2000 seconds).
    // If the request processing exceeds this time, the request will be terminated with a timeout error.
    return next.handle().pipe(timeout(2000000));
  }
}
