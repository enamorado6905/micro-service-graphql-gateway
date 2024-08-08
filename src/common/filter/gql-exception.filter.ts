import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { LanguageClass } from '../util/class/language.class';
import { GraphQLError } from 'graphql';
import {
  getCodeErrorMessage,
  transformErrorCode,
} from '../helpers/cast.helper';
import { ExceptionErrorMessageEnum } from '../enum/error/exception-error-message.enum';

@Catch(HttpException, RpcException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly language: LanguageClass) {}

  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = gqlHost.getContext().res;

    if (exception instanceof RpcException) {
      return this.handleRpcException(exception, response);
    } else if (exception instanceof HttpException) {
      return this.handleGqlException(exception);
    } else {
      return new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private handleGqlException(exception: HttpException) {
    const exceptionResponse = exception.getResponse();
    const { code, statusCode, codeMessage, message } = exceptionResponse as any;
    const status = code || statusCode;

    const graphQLErrorCodeMessage = getCodeErrorMessage(codeMessage);

    const graphQLErrorCode = transformErrorCode(status);

    const graphQLErrorMessage = this.getCustomMessage(
      graphQLErrorCodeMessage,
      message,
    );

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

    const graphQLErrorCode = transformErrorCode(code);

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

  private getCustomMessage(
    status: string = 'exception.DEFAULT_MESSAGE',
    defaultMessage: string,
  ): string {
    return this.language.language(
      `exception.${ExceptionErrorMessageEnum[status]}`,
      {
        message: defaultMessage,
      },
    );
  }
}
