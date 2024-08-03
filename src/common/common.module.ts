import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQlModule } from '../graph-ql/graph-ql.module';
import { ExceptionClass } from './util/class/exception.class';
import { AxiosClass } from './util/class/axios.class';
import { HttpModule } from '@nestjs/axios';
import { UsersServiceClass } from './util/class/service/user.service.class';
import { CognitoServiceClass } from './util/class/service/cognito.service.class';

/**
 * A NestJS module that acts as a common module for the application.
 * It is used for importing and organizing other modules within the application.
 */
@Module({
  providers: [
    ExceptionClass,
    AxiosClass,
    UsersServiceClass,
    CognitoServiceClass,
  ],
  imports: [GraphQlModule, ConfigModule, HttpModule],
  exports: [ExceptionClass, AxiosClass, UsersServiceClass, CognitoServiceClass],
})
export class CommonModule {}
