import { ApolloServerErrorCode } from '@apollo/server/errors';
import { ExceptionClass } from '../util/class/exception.class';

/**
 * Creates an error exception based on the provided Apollo Server error code and message.
 * @param errorCode - The Apollo Server error code.
 * @param message - The error message.
 * @returns The error exception object.
 */
export function errorExceptions(
  errorCode: ApolloServerErrorCode,
  message: any,
) {
  const exceptionClass = new ExceptionClass(errorCode, message);
  return exceptionClass.exceptionServerError();
}
