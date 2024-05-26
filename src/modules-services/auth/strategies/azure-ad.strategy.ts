import { BearerStrategy, ITokenPayload } from 'passport-azure-ad';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      identityMetadata:
        'https://login.microsoftonline.com/9c63fad3-ae8c-4130-8862-985367d83bb8/v2.0/.well-known/openid-configuration',
      clientID: configService.get('AZURE_AD_CLIENT_ID'),
      validateIssuer: true,
      issuer:
        'https://login.microsoftonline.com/9c63fad3-ae8c-4130-8862-985367d83bb8/v2.0',
      audience: configService.get('AZURE_AD_CLIENT_ID'),
      loggingLevel: 'warn',
      passReqToCallback: false,
    });
  }

  async validate(response: ITokenPayload) {
    console.log(response);
    return response;
  }
}
