import {
  BadRequestException,
  ConflictException,
  GoneException,
  HttpVersionNotSupportedException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
  PayloadTooLargeException,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ExceptionEnum } from '../../enum/error/exception.enum';
import { ErrorsKeysEnum } from '../../enum/error/errors.keys';

/**
 * A class that handles exceptions in a NestJS application.
 *
 * @description
 * The class works as follows:
 * 1. It defines a `verifyPromise` method that verifies a promise and throws an exception if the promise is rejected.
 * 2. It defines a `throwExceptionByStatusCode` method that throws an exception based on the status code.
 *
 * @example
 * const exceptionClass = new ExceptionClass();
 */
@Injectable()
export class ExceptionClass<T> {
  /**
   * Throws an exception based on the status code.
   *
   * @param {ExceptionEnum} statusCode - The status code.
   * @param {string} message - The error message.
   * @param {object | undefined} error - The error object.
   * @returns {Promise<any>} Never resolves because an exception is always thrown.
   *
   * @description
   * The function works as follows:
   * 1. It checks the status code.
   * 2. It throws an exception based on the status code.
   *
   * @example
   * const statusCode = ExceptionEnum.ConflictException;
   * const message = 'Conflict';
   * const error = new Error('Conflict');
   * await exceptionClass.throwExceptionByStatusCode(statusCode, message, error);
   */
  public async throwExceptionByStatusCode(
    statusCode: ExceptionEnum,
    message: string,
    codeError: ErrorsKeysEnum,
    error?: object,
  ): Promise<any> {
    switch (statusCode) {
      case ExceptionEnum.BadRequestException:
        throw new BadRequestException({ message, codeError }, error);
      case ExceptionEnum.UnauthorizedException:
        throw new UnauthorizedException({ message, codeError }, error);
      case ExceptionEnum.ConflictException:
        throw new ConflictException({ message, codeError }, error);
      case ExceptionEnum.GoneException:
        throw new GoneException({ message, codeError }, error);
      case ExceptionEnum.HttpVersionNotSupportedException:
        throw new HttpVersionNotSupportedException(
          { message, codeError },
          error,
        );
      case ExceptionEnum.PayloadTooLargeException:
        throw new PayloadTooLargeException({ message, codeError }, error);
      case ExceptionEnum.UnsupportedMediaTypeException:
        throw new UnsupportedMediaTypeException({ message, codeError }, error);
      case ExceptionEnum.UnprocessableEntityException:
        throw new UnprocessableEntityException({ message, codeError }, error);
      case ExceptionEnum.InternalServerErrorException:
        throw new UnauthorizedException({ message, codeError }, error);
      case ExceptionEnum.NotImplementedException:
        throw new UnauthorizedException({ message, codeError }, error);
      case ExceptionEnum.ImATeapotException:
        throw new UnauthorizedException({ message, codeError }, error);
      case ExceptionEnum.MethodNotAllowedException:
        throw new MethodNotAllowedException({ message, codeError }, error);
      case ExceptionEnum.BadGatewayException:
        throw new UnauthorizedException({ message, codeError }, error);
      case ExceptionEnum.ServiceUnavailableException:
        throw new UnauthorizedException({ message, codeError }, error);
      case ExceptionEnum.GatewayTimeoutException:
        throw new UnauthorizedException({ message, codeError }, error);
      case ExceptionEnum.PreconditionFailedException:
        throw new UnauthorizedException({ message, codeError }, error);
      default:
        throw new InternalServerErrorException({ message, codeError }, error);
    }
  }

  public async verifyPromise(
    promise: Promise<T>,
    type: ExceptionEnum,
    codeError: ErrorsKeysEnum,
  ): Promise<T> {
    try {
      return await promise;
    } catch (error: Error | any) {
      return this.throwExceptionByStatusCode(
        type,
        error.message,
        codeError,
        error,
      );
    }
  }
}
