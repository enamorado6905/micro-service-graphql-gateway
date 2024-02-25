import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ManagerPermission } from './manager-permission/entities/manager-permission.entity';

@Module({
  imports: [UsersModule, AuthModule, ManagerPermission],
})
export class ModulesServicesModule {}
