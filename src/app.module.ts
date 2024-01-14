import { Module } from '@nestjs/common';
import { ModulesServicesModule } from './modules-services/modules-services.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQlModule } from './graph-ql/graph-ql.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [GraphQlModule, ModulesServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
