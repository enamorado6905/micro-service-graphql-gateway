import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '../../common/common.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersRepository } from './repository/user.repository.class';
import { UsersExportsService } from './users-exports.service';

@Module({
  providers: [
    UsersResolver,
    UsersService,
    UsersRepository,
    UsersExportsService,
  ],
  imports: [CommonModule, ConfigModule],
  exports: [UsersExportsService],
})
export class UsersModule {}
