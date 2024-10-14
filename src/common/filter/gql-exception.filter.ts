import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { LanguageClass } from '../class/operation/language.class';
import { GraphQLError } from 'graphql';
import {
  getCodeErrorMessage,
  transformErrorCode,
} from '../helpers/cast.helper';
import { LoggerClass } from '../class/operation/logger.class';
import { ErrorsKeysEnum } from '../enum/error/errors.keys';

@Catch(HttpException, RpcException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  constructor(
    private readonly language: LanguageClass,
    private readonly logger: LoggerClass,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = gqlHost.getContext().res;

    if (exception instanceof RpcException) {
      this.logger.error(exception.message, exception.stack, ErrorsKeysEnum.RPC);
      return this.handleRpcException(exception, response);
    } else if (exception instanceof HttpException) {
      this.logger.error(
        exception.message,
        exception.stack,
        ErrorsKeysEnum.HTTP,
      );
      return this.handleGqlException(exception);
    } else {
      this.logger.error(
        exception.message,
        exception.stack,
        ErrorsKeysEnum.UNKNOWN,
      );
      return new GraphQLError(exception.message, {
        extensions: {
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          messages: exception.message,
        },
      });
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
      message || '',
    );

    if (Array.isArray(message)) {
      const graphQLErrorMessages = message.map((msg: string) => {
        return this.getCustomMessage(getCodeErrorMessage(msg), msg);
      });

      this.logger.error(
        graphQLErrorMessages.toLocaleString(', '),
        exception.stack,
        ErrorsKeysEnum.GQL,
      );

      return new GraphQLError(graphQLErrorMessages.join(','), {
        extensions: {
          code: graphQLErrorCode,
          messages: graphQLErrorMessages,
        },
      });
    }

    this.logger.error(graphQLErrorMessage, exception.stack, ErrorsKeysEnum.GQL);

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

  private getCustomMessage(status: string, defaultMessage: string): string {
    return this.language.language(status, {
      message: defaultMessage,
    });
  }
}
