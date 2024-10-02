import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '@nestjs/config';
import { PermissionRepository } from './repository/permission.service.class';

@Module({
  providers: [PermissionResolver, PermissionService, PermissionRepository],
  imports: [CommonModule, ConfigModule],
  exports: [PermissionRepository],
})
export class PermissionModule {}
