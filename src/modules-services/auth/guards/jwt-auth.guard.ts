// src/auth/jwt-auth.guard.ts or src/guards/jwt-auth.guard.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any): any {
    console.log('err', err);
    console.log('user', user);

    if (err || !user) {
      // You can customize the error message here
      throw err || new UnauthorizedException('Unauthorized');
    }
    // You could add additional checks or logging here if needed
    return user;
  }
}
