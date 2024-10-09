import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '@nestjs/config';
import { OrganizationRepository } from './repository/organization.repository.class';

@Module({
  imports: [CommonModule, ConfigModule],
  exports: [OrganizationRepository],
  providers: [
    OrganizationResolver,
    OrganizationService,
    OrganizationRepository,
  ],
})
export class OrganizationModule {}
