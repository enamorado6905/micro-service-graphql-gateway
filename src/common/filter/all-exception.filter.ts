import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * A filter that catches all exceptions thrown within the application.
 *
 * @description
 * The class works as follows:
 * 1. It defines a `logger` property that is an instance of `Logger`.
 * 2. It defines an asynchronous `catch` method that handles the exceptions.
 *
 * @example
 * const allExceptionFilter = new AllExceptionFilter();
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  /**
   * Handles the exceptions.
   *
   * @param {unknown | any} exception - The exception to handle.
   * @param {ArgumentsHost} host - The arguments host.
   *
   * @description
   * The function works as follows:
   * 1. It logs the exception.
   * 2. It gets the HTTP context and response.
   * 3. It determines the status of the response based on the type of the exception.
   * 4. It determines the error message based on the type of the exception.
   * 5. It logs the status and error.
   * 6. It sets the body of the response and sends it.
   *
   * @example
   * const exception = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
   * const host = new ArgumentsHost([]);
   * await allExceptionFilter.catch(exception, host);
   */
  async catch(exception: unknown | any, host: ArgumentsHost) {
    // Log the exception.
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Determine the status of the response based on the type of the exception.
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Determine the error message based on the type of the exception.
    const error =
      exception instanceof HttpException ? exception.getResponse() : exception;

    // Log the status and error.
    this.logger.error(`Status ${status} Error ${JSON.stringify(error)}`);

    // Set the body of the response and send it.
    const body = {
      status,
      path: response.req.url,
      codeError: exception?.response?.codeError ?? 'A0',
      message: error?.message,
    };

    // Set the body of the response and send it.
    response.status(status).json(body);
  }
}
