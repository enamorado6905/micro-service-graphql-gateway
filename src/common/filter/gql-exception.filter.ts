import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { LanguageClass } from '../util/class/language.class';
import { status } from '@grpc/grpc-js';
import { GraphQLError } from 'graphql';

@Catch(HttpException, RpcException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly language: LanguageClass) {}

  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = gqlHost.getContext().res;

    if (exception instanceof RpcException) {
      console.error('RPC Exception:', exception);
      return this.handleRpcException(exception, response);
    } else if (exception instanceof HttpException) {
      console.error('Http Exception:', exception);
      return this.handleGqlException(exception);
    } else {
      console.error('Unknown Exception:', exception);
      return new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private handleGqlException(exception: HttpException) {
    const exceptionResponse = exception.getResponse();
    const { message, code, statusCode } = exceptionResponse as any;
    const status = code || statusCode;
    const graphQLErrorCode = this.transformErrorCode(status);
    const graphQLErrorMessage = this.getCustomMessage(status, message);

    return new GraphQLError(graphQLErrorMessage, {
      extensions: {
        code: graphQLErrorCode,
      },
    });
  }

  private handleRpcException(exception: RpcException, response: any) {
    const rpcError = exception.getError();
    const customMessage = this.language.language('exception.RPC_ERROR', {});

    const { message, code } = rpcError as any;

    const graphQLErrorCode = this.transformErrorCode(code);

    response.status(500).json({
      message,
      extensions: {
        code: graphQLErrorCode,
        customMessage,
      },
    });

    return new HttpException(
      {
        message,
        code: graphQLErrorCode,
        status: 500,
      },
      500,
    );
  }

  private transformErrorCode(errorCode: string | number): string {
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

  private getCustomMessage(status: number, defaultMessage: status): string {
    switch (status) {
      case 400:
        return this.language.language('exception.400', {});
      case 401:
        return this.language.language('exception.401', {});
      case 403:
        return this.language.language('exception.403', {});
      case 404:
        return this.language.language('exception.404', {});
      case 500:
        return this.language.language('exception.500', {});
      default:
        return this.language.language('exception.DEFAULT_MESSAGE', {
          message: defaultMessage,
        });
    }
  }
}
