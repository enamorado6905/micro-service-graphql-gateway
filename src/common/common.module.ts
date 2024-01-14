import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQlModule } from '../graph-ql/graph-ql.module';

/**
 * A NestJS module that acts as a common module for the application.
 * It is used for importing and organizing other modules within the application.
 */
@Module({
  providers: [],
  imports: [GraphQlModule, ConfigModule],
  exports: [],
})
export class CommonModule {}
