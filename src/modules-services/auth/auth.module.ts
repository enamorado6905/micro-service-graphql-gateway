import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AzureAuthService } from './azure-auth.service';

@Module({
  imports: [CommonModule, ConfigModule, PassportModule],
  exports: [PassportModule],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, AzureAuthService],
})
export class AuthModule {}
