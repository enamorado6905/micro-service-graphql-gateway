import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

export const JWT_AUTH_PROVIDERS = [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
];
