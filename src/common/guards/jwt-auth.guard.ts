import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { AuthResolverEnum } from '../enum/system/name-resolver/auth-resolver.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * Determines if the current request can proceed based on JWT authentication.
   * @param context - The execution context of the request.
   * @returns A boolean indicating whether the request can proceed.
   */
  canActivate(context: ExecutionContext) {
    // Check if the route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // Create a GraphQL execution context
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();

    // List of GraphQL mutations that do not require authentication
    const excludedMutations = [
      AuthResolverEnum.LOGIN_COGNITO,
      AuthResolverEnum.AUTH_COGNITO,
      AuthResolverEnum.AUTH_REMOVE_COGNITO,
      AuthResolverEnum.RESEND_CONFIMATION_CODE_COGNITO,
      AuthResolverEnum.AUTH_VALIDATE_REGISTRATION,
    ];
    const operationName = info?.fieldName;

    // Allow access if the operation is in the list of excluded mutations
    if (excludedMutations.includes(operationName)) {
      return true;
    }

    // Proceed with the default JWT authentication guard
    return super.canActivate(context);
  }

  /**
   * Retrieves the request object from the GraphQL execution context.
   * @param context - The execution context of the request.
   * @returns The request object.
   */
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}
