import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthCognitoModule } from './auth-cognito/auth-cognito.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [UsersModule, AuthCognitoModule, RoleModule, PermissionModule, OrganizationModule],
})
export class ModulesServicesModule {}
