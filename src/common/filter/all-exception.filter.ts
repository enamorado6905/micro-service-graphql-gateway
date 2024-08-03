import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { status as grpcStatus, status } from '@grpc/grpc-js';

@Catch()
export class RpcExceptionsFilter implements ExceptionFilter {
  catch(exception: any) {
    console.log('exception', exception);
    return this.grpcException(exception);
  }

  private httpException(exception: any) {
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      exception instanceof HttpException ? exception.getResponse() : exception;

    throw new ApolloError(
      msg.message,
      status[this.httpToGrpcStatus(httpStatus)],
    );
  }

  private grpcException(exception: any) {
    // const errorException = JSON.parse(exception);

    const errorResponse = {
      statusCode: grpcStatus.INTERNAL,
      message: 'An unexpected error occurred',
    };

    errorResponse.statusCode = grpcStatus.INTERNAL;

    errorResponse.message = exception.message;

    throw new ApolloError(
      errorResponse.message,
      status[errorResponse.statusCode.toString()],
    );
  }

  private httpToGrpcStatus(httpStatus: number) {
    switch (httpStatus) {
      case 200:
        return grpcStatus.OK;
      case 400:
        return grpcStatus.INVALID_ARGUMENT;
      case 401:
        return grpcStatus.UNAUTHENTICATED;
      case 403:
        return grpcStatus.PERMISSION_DENIED;
      case 404:
        return grpcStatus.NOT_FOUND;
      case 409:
        return grpcStatus.ABORTED;
      case 429:
        return grpcStatus.RESOURCE_EXHAUSTED;
      case 500:
        return grpcStatus.INTERNAL;
      case 501:
        return grpcStatus.UNIMPLEMENTED;
      case 503:
        return grpcStatus.UNAVAILABLE;
      case 504:
        return grpcStatus.DEADLINE_EXCEEDED;
      default:
        return grpcStatus.UNKNOWN;
    }
  }
}
