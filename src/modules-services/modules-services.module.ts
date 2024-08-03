import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthCognitoModule } from './auth-cognito/auth-cognito.module';

@Module({
  imports: [UsersModule, AuthCognitoModule],
})
export class ModulesServicesModule {}
