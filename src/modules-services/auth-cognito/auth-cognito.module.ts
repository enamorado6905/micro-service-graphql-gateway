import { Module } from '@nestjs/common';
import { AuthCognitoService } from './auth-cognito.service';
import { AuthCognitoResolver } from './auth-cognito.resolver';
import { CommonModule } from '../../common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { CognitoRepository } from './repository/cognito.service.class';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          audience: configService.get<string>('APP_URL'),
        },
      }),
    }),
    UsersModule,
  ],
  providers: [
    AuthCognitoResolver,
    AuthCognitoService,
    CognitoRepository,
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [PassportModule, CognitoRepository],
})
export class AuthCognitoModule {}
