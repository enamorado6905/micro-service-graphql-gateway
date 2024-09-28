import { Status } from '@grpc/grpc-js/build/src/constants';
import { ToNumberOptions } from '../interfaces/to-number-options.interface';
import { ExceptionErrorMessageEnum } from '../enum/error/exception-error-message.enum';
import { INestApplication, Logger } from '@nestjs/common';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { printSchema } from 'graphql';

/**
 * Converts a string to lowercase.
 *
 * @param value - The string to convert to lowercase.
 * @returns The lowercase version of the input string.
 */
export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

/**
 * Trims whitespace from both ends of a string.
 *
 * @param value - The string to trim.
 * @returns The trimmed string.
 */
export function trim(value: string): string {
  return value.trim();
}

/**
 * Converts a string to a Date object.
 *
 * @param value - The string to convert to a date.
 * @returns The Date object created from the input string.
 */
export function toDate(value: string): Date {
  return new Date(value);
}

/**
 * Converts a string to a boolean.
 *
 * @param value - The string to convert to boolean. Accepts 'true', '1' for true, other values are false.
 * @returns The boolean value of the string.
 */
export function toBoolean(value: string): boolean {
  value = value.toLowerCase();
  return value === 'true' || value === '1';
}

/**
 * Converts a string to a number, with optional constraints.
 *
 * @param value - The string to convert to a number.
 * @param opts - An object containing optional parameters: default, min, and max.
 * @returns The number after conversion and applying constraints, if any.
 */
export function toNumber(
  value: string,
  opts: ToNumberOptions = { min: 0, max: Infinity }, // Set default max to Infinity
): number {
  const parsedValue = Number.parseFloat(value); // Use parseFloat to handle decimal numbers

  if (Number.isNaN(parsedValue)) {
    return opts.default ?? 0; // Return default value if parsing fails
  }

  let clampedValue = Math.max(opts.min ?? -Infinity, parsedValue); // Clamp value between min and max
  clampedValue = Math.min(opts.max ?? Infinity, clampedValue);

  return clampedValue;
}

export function getErrorCode(status: number): string {
  switch (status) {
    case 400 | Status.INVALID_ARGUMENT:
      return 'BAD_REQUEST';
    case 401 | Status.UNAUTHENTICATED:
      return 'UNAUTHENTICATED';
    case 403 | Status.PERMISSION_DENIED:
      return 'FORBIDDEN';
    case 404 | Status.NOT_FOUND:
      return 'NOT_FOUND';
    case 500 | Status.INTERNAL:
      return 'INTERNAL_SERVER_ERROR';
    default:
      return 'UNKNOWN_ERROR';
  }
}

export function getCodeErrorMessage(code: string): string {
  return (
    ExceptionErrorMessageEnum[code as keyof typeof ExceptionErrorMessageEnum] ||
    ExceptionErrorMessageEnum.COGNITO_AUTH_ERROR_0000
  );
}

export function extractErrorDetails(errorString: string): {
  message: string;
  code: number;
  codeMessage: string;
  // Add more error details as needed
} {
  const jsonString = errorString.substring(errorString.indexOf('{'));
  const errorObject = JSON.parse(jsonString);
  return {
    message: errorObject.message,
    code: errorObject.code,
    codeMessage: errorObject.codeMessage,
  };
}

export function transformErrorCode(errorCode: string | number): string {
  const errorCodeMapping: { [key: string]: string } = {
    BAD_REQUEST: 'BAD_USER_INPUT', // Bad request error codes
    400: 'BAD_USER_INPUT',

    UNAUTHENTICATED: 'UNAUTHENTICATED', // Authentication error codes
    401: 'UNAUTHENTICATED',

    FORBIDDEN: 'FORBIDDEN', // Permission/authorization error codes
    403: 'FORBIDDEN',

    NOT_FOUND: 'NOT_FOUND', // Resource not found error codes
    404: 'NOT_FOUND',

    RPC_ERROR: 'INTERNAL_SERVER_ERROR', // Internal server or RPC errors
    500: 'INTERNAL_SERVER_ERROR',

    CONFLICT: 'CONFLICT', // Data conflict error codes
    409: 'CONFLICT',

    REQUEST_TIMEOUT: 'REQUEST_TIMEOUT', // Request timeout error
    408: 'REQUEST_TIMEOUT',

    UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY', // Unprocessable entity error codes
    422: 'UNPROCESSABLE_ENTITY',

    TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS', // Too many requests error
    429: 'TOO_MANY_REQUESTS',
  };

  // Return the corresponding GraphQL error code, or INTERNAL_SERVER_ERROR by default
  return errorCodeMapping[errorCode] || 'INTERNAL_SERVER_ERROR';
}

export async function listGraphQLRoutes(app: INestApplication) {
  const gqlSchemaHost = app.get(GraphQLSchemaHost);
  const schema = gqlSchemaHost.schema;
  const printedSchema = printSchema(schema);
  Logger.log('GraphQL Schema:', printedSchema);
}
