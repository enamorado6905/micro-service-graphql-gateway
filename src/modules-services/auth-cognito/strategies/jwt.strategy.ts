// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

/**
 * A Passport strategy for handling JWT authentication.
 *
 * @description
 * The class works as follows:
 * 1. The `constructor` method is called when a new instance of `JwtStrategy` is created. It takes a `configService` as a parameter, which is used to get configuration values.
 * 2. Inside the `constructor`, the `super` method is called with an object that contains the options for the JWT strategy.
 * 3. The `validate` method is an asynchronous method that takes a `payload` as a parameter and returns it. This method is used by Passport.js to validate the payload of the JWT and produce the user object.
 *
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: configService.get('COGNITO_ISSUER_URI'),
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: configService.get('COGNITO_JWKS_URI'),
      }),
    });
  }

  /**
   * Validates the payload of the JWT and produces the user object.
   *
   * @param {any} payload - The payload of the JWT.
   * @returns {any} The payload of the JWT.
   *
   * @description
   * The function works as follows:
   * 1. It takes a `payload` as a parameter.
   * 2. It returns the `payload` without any validation or transformation.
   *
   * @example
   * const payload = { sub: '1234567890', name: 'John Doe', iat: 1516239022 };
   * await jwtStrategy.validate(payload);
   */
  public async validate(payload: any, done: VerifiedCallback): Promise<void> {
    return done(null, payload);
  }
}
