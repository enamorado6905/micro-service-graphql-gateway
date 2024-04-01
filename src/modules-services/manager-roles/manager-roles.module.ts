import { Module } from '@nestjs/common';
import { ManagerRolesService } from './manager-roles.service';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '@nestjs/config';
import { ManagerRolesResolver } from './manager-roles.resolver';

@Module({
  providers: [ManagerRolesResolver, ManagerRolesService],
  imports: [CommonModule, ConfigModule],
})
export class ManagerRolesModule {}
