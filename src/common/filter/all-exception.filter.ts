// Import necessary classes from NestJS packages
import { Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

/**
 * Filter that catches all exceptions and returns them as is.
 * @remarks
 * This filter is a global exception filter that catches all exceptions
 * Since no specific exception types are passed to the @Catch decorator.
 */
@Catch()
export class AllExceptionFilter implements GqlExceptionFilter {
  /**
   * Handles the caught exceptions.
   * @param exception - The caught exception of type HttpException.
   * @returns The caught exception as is.
   * @remarks
   * In this basic implementation, the caught exception is returned as is.
   * You can customize this method to log the exception, transform it, or perform
   * Other actions.
   */
  catch(exception: HttpException) {
    return exception;
  }
}
