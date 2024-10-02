import { APP_GUARD } from '@nestjs/core';
import { GqlAuthorizationAuthGuard } from '../../guards/graphql-authorization-auth.guard';

export const AUTHORIZATION_AUTH_PROVIDERS = [
  {
    provide: APP_GUARD,
    useClass: GqlAuthorizationAuthGuard,
  },
];
