/**
 * Enum representing different types of HTTP exceptions.
 * Each member corresponds to a specific HTTP error scenario,
 * useful for categorizing and responding to various API or server exceptions.
 */
export enum ExceptionEnum {
  BadRequestException = 'BadRequestException', // Represents a 400 Bad Request error.
  UnauthorizedException = 'UnauthorizedException', // Represents a 401 Unauthorized error.
  NotFoundException = 'NotFoundException', // Represents a 404 Not Found error.
  ForbiddenException = 'ForbiddenException', // Represents a 403 Forbidden error.
  NotAcceptableException = 'NotAcceptableException', // Represents a 406 Not Acceptable error.
  RequestTimeoutException = 'RequestTimeoutException', // Represents a 408 Request Timeout error.
  ConflictException = 'ConflictException', // Represents a 409 Conflict error.
  GoneException = 'GoneException', // Represents a 410 Gone error.
  HttpVersionNotSupportedException = 'HttpVersionNotSupportedException', // Represents a 505 HTTP Version Not Supported error.
  PayloadTooLargeException = 'PayloadTooLargeException', // Represents a 413 Payload Too Large error.
  UnsupportedMediaTypeException = 'UnsupportedMediaTypeException', // Represents a 415 Unsupported Media Type error.
  UnprocessableEntityException = 'UnprocessableEntityException', // Represents a 422 Unprocessable Entity error.
  InternalServerErrorException = 'InternalServerErrorException', // Represents a 500 Internal Server Error.
  NotImplementedException = 'NotImplementedException', // Represents a 501 Not Implemented error.
  ImATeapotException = 'ImATeapotException', // Represents a 418 I'm a Teapot error (April Fools' joke in RFC 2324).
  MethodNotAllowedException = 'MethodNotAllowedException', // Represents a 405 Method Not Allowed error.
  BadGatewayException = 'BadGatewayException', // Represents a 502 Bad Gateway error.
  ServiceUnavailableException = 'ServiceUnavailableException', // Represents a 503 Service Unavailable error.
  GatewayTimeoutException = 'GatewayTimeoutException', // Represents a 504 Gateway Timeout error.
  PreconditionFailedException = 'PreconditionFailedException', // Represents a 412 Precondition Failed error.
}
