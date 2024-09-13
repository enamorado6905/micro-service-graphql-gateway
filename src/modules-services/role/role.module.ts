import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [RoleResolver, RoleService],
  imports: [CommonModule, ConfigModule],
})
export class RoleModule {}
