import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '@nestjs/config';
import { RoleRepository } from './repository/role.service.class';

@Module({
  providers: [RoleResolver, RoleService, RoleRepository],
  imports: [CommonModule, ConfigModule],
  exports: [RoleRepository],
})
export class RoleModule {}
