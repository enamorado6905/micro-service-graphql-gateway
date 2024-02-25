import { Module } from '@nestjs/common';
import { ManagerPermissionService } from './manager-permission.service';
import { ManagerPermissionResolver } from './manager-permission.resolver';

@Module({
  providers: [ManagerPermissionResolver, ManagerPermissionService],
})
export class ManagerPermissionModule {}
