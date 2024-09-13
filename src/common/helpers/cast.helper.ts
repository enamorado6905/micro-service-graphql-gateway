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
export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  // If the conversion results in NaN, use the default value if provided.
  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  // Apply minimum and maximum constraints if they are provided.
  if (opts.min !== undefined && newValue < opts.min) {
    newValue = opts.min;
  }
  if (opts.max !== undefined && newValue > opts.max) {
    newValue = opts.max;
  }

  return newValue;
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

export function getCodeErrorMessage(code: number): string {
  return (
    ExceptionErrorMessageEnum[code] ||
    ExceptionErrorMessageEnum.COGNITO_AUTH_ERROR_0000
  );
}

export function extractErrorDetails(errorString: string): {
  message: string;
  code: number;
  codeMessage: string;
  // Add more error details as needed
} {
  console.log('errorString', errorString);
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
    BAD_REQUEST: 'BAD_USER_INPUT',
    400: 'BAD_USER_INPUT',
    UNAUTHENTICATED: 'UNAUTHENTICATED',
    401: 'UNAUTHENTICATED',
    FORBIDDEN: 'FORBIDDEN',
    403: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    404: 'NOT_FOUND',
    RPC_ERROR: 'INTERNAL_SERVER_ERROR',
    500: 'INTERNAL_SERVER_ERROR',
  };

  return errorCodeMapping[errorCode] || 'INTERNAL_SERVER_ERROR';
}

export async function listGraphQLRoutes(app: INestApplication) {
  const gqlSchemaHost = app.get(GraphQLSchemaHost);
  const schema = gqlSchemaHost.schema;
  const printedSchema = printSchema(schema);
  Logger.log('GraphQL Schema:', printedSchema);
}
