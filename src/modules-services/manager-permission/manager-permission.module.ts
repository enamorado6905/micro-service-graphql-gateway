import { Module } from '@nestjs/common';
import { ManagerPermissionService } from './manager-permission.service';
import { ManagerPermissionResolver } from './manager-permission.resolver';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ManagerPermissionResolver, ManagerPermissionService],
  imports: [CommonModule, ConfigModule],
  exports: [],
})
export class ManagerPermissionModule {}
