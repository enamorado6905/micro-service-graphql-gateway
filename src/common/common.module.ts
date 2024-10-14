import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as yaml from 'js-yaml';
import {
  AcceptLanguageResolver,
  CookieResolver,
  GraphQLWebsocketResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { GraphQlModule } from '../graph-ql/graph-ql.module';
import { ExceptionClass } from './class/exception/exception.class';
import { AxiosClass } from './class/connection/axios.class';
import { HttpModule } from '@nestjs/axios';
import { readFileSync } from 'fs';
import { LanguageClass } from './class/operation/language.class';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLExceptionFilter } from './filter/gql-exception.filter';
import { LoggerClass } from './class/operation/logger.class';
import { JWT_AUTH_PROVIDERS } from './constants/providers/jwt.providers';
import { LOGGER_PROVIDERS } from './constants/providers/logger.providers';

/**
 * A NestJS module that acts as a common module for the application.
 * It is used for importing and organizing other modules within the application.
 */
@Module({
  providers: [
    ExceptionClass,
    AxiosClass,
    LanguageClass,
    LoggerClass,
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionFilter,
    },
    ...LOGGER_PROVIDERS,
    ...JWT_AUTH_PROVIDERS,
    // ...AUTHORIZATION_AUTH_PROVIDERS,
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          return yaml.load(
            readFileSync(join(__dirname, '../..', 'config.yaml'), 'utf8'),
          ) as Record<string, any>;
        },
      ],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('fallback_language'),
        loaderOptions: {
          path: join(__dirname, '../..', '/i18n/'),
          watch: true,
        },
        // typesOutputPath: join(__dirname, '../generated/i18n.generated.ts'),
      }),
      resolvers: [
        GraphQLWebsocketResolver,
        { use: QueryResolver, options: ['x-custom-lang'] },
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
      inject: [ConfigService],
    }),
    GraphQlModule,
    HttpModule,
  ],
  exports: [ExceptionClass, AxiosClass, LanguageClass, LoggerClass],
})
export class CommonModule {}
