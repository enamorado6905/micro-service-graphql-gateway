import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class GraphQLExceptionFilter
  implements GqlExceptionFilter<HttpException>
{
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    console.error(gqlHost);
    return exception;
  }
}
