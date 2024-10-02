import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { LanguageClass } from '../class/operation/language.class';

@Catch(HttpException, RpcException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly language: LanguageClass) {}

  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = gqlHost.getContext().res;

    if (exception instanceof RpcException) {
      return this.handleRpcException(exception, response);
    } else if (exception instanceof HttpException) {
      return this.handleGqlException(exception, response);
    } else {
      return new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private handleGqlException(exception: HttpException, response: any) {
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    console.error('GraphQL Exception Response:', exceptionResponse);

    const { message, code } = exceptionResponse as any;

    const graphQLErrorCode = this.transformErrorCode(code);

    response.status(status).json({
      message,
      extensions: {
        code: graphQLErrorCode,
      },
    });

    return new HttpException(
      {
        message,
        code: graphQLErrorCode,
        status,
      },
      status,
    );
  }

  private handleRpcException(exception: RpcException, response: any) {
    const rpcError = exception.getError();
    // const customMessage = this.language.language('exception.RPC_ERROR', {});

    console.error('RPC Exception Response:', rpcError);

    const { message, code } = rpcError as any;

    const graphQLErrorCode = this.transformErrorCode(code);

    response.status(500).json({
      message,
      extensions: {
        code: graphQLErrorCode,
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

  private transformErrorCode(errorCode: string): string {
    // Map custom error codes to GraphQL error codes
    switch (errorCode) {
      case 'BAD_REQUEST':
        return 'BAD_USER_INPUT';
      case 'UNAUTHENTICATED':
        return 'UNAUTHENTICATED';
      case 'FORBIDDEN':
        return 'FORBIDDEN';
      case 'NOT_FOUND':
        return 'NOT_FOUND';
      case 'RPC_ERROR':
        return 'INTERNAL_SERVER_ERROR';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }
}
