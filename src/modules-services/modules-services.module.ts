import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ManagerRolesModule } from './manager-roles/manager-roles.module';
import { ManagerPermissionModule } from './manager-permission/manager-permission.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ManagerPermissionModule,
    ManagerRolesModule,
  ],
})
export class ModulesServicesModule {}
