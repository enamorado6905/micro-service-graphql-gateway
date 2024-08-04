import { Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { LanguageClass } from '../util/class/language.class';

@Catch(HttpException)
export class GraphQLExceptionFilter
  implements GqlExceptionFilter<HttpException>
{
  constructor(private readonly language: LanguageClass) {}
  catch(exception: HttpException) {
    const response = exception.getResponse();
    const status = exception.getStatus();

    const customMessage = this.getCustomMessage(status, response);

    exception.message = customMessage;

    return exception;
  }

  private getCustomMessage(status: number, response: any): string {
    const defaultMessage =
      typeof response === 'object' && response !== null
        ? (response as any).message
        : response;

    switch (status) {
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

  private getErrorCode(status: number): string {
    switch (status) {
      case 401:
        return 'UNAUTHENTICATED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 500:
        return 'INTERNAL_SERVER_ERROR';
      default:
        return 'UNKNOWN_ERROR';
    }
  }
}
