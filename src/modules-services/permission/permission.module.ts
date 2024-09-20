import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [PermissionResolver, PermissionService],
  imports: [CommonModule, ConfigModule],
})
export class PermissionModule {}
