import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '../../common/common.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersRepository } from './repository/user.repository.class';

@Module({
  providers: [UsersResolver, UsersService, UsersRepository],
  imports: [CommonModule, ConfigModule],
  exports: [UsersRepository],
})
export class UsersModule {}
