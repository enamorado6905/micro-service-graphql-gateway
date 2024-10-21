import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrganizationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Switch to GraphQL execution context
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    const user = req.user;
    const organizationId = user.user.organization;
    const args = gqlContext.getArgs();
    args.createUserInput.organization = organizationId;

    return next.handle().pipe(map((data) => data));
  }
}
