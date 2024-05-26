import { Injectable } from '@nestjs/common';
import { AxiosClass } from '../../common/util/class/axios.class';
import { ConfigService } from '@nestjs/config';
import { ProxyRabbitMQ } from '../../common/util/class/proxy-rabbit-mq.class';
import { RabbitMqEnum } from '../../common/enum/msg/rabbit-mq.enum';
import { AuthUsersMsgEnum } from '../../common/enum/msg/auth-users.enum';
import { CustomAuthEnum } from '../../common/enum/auth/custom-auth.enum';
import {
  generateCodeChallenge,
  generateCodeVerifier,
} from '../../common/util/method/algorithms.method';

/**
 * The `AuthService` class provides methods for managing user authentication in the application.
 *
 * This class uses the `ProxyRabbitMQ` utility class to communicate with a RabbitMQ server. The `ProxyRabbitMQ` instance is created in the constructor of the class and is used in all methods that need to communicate with the RabbitMQ server.
 *
 * The `@Injectable()` decorator is used to mark the class as a provider that can be managed by the NestJS dependency injection container.
 */
@Injectable()
export class AzureAuthService {
  /**
   * The `proxyRabbitMQ` property is an instance of the `ProxyRabbitMQ` utility class.
   * This property is used to communicate with a RabbitMQ server.
   * The `ProxyRabbitMQ` instance is created with the `RabbitMqEnum.usersQueue` parameter, which
   * Specifies the name of the RabbitMQ queue to use.
   */
  private readonly proxyRabbitMQ = new ProxyRabbitMQ(RabbitMqEnum.cognitoQueue);

  /**
   * The constructor of the `AuthService` class.
   *
   * The constructor creates a new instance of the `ProxyRabbitMQ` utility class with the `RabbitMqEnum.authUsersQueue` parameter, which specifies the name of the RabbitMQ queue to use for user authentication operations.
   *
   */
  constructor(
    private readonly axiosClass: AxiosClass,
    private readonly configService: ConfigService,
  ) {}

  public loginWithAzure(): string {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    const url =
      this.configService.get('AZURE_AD_AUTHORIZE_V2') +
      `?client_id=${this.configService.get('AZURE_AD_CLIENT_ID')}` +
      `&response_type=${this.configService.get('AZURE_AD_RESPONSE_TYPE')}` +
      `&redirect_uri=${this.configService.get('AZURE_AD_REDIRECT_URI')}` +
      `&scope=${this.configService.get('AZURE_AD_SCOPE')}` +
      `&state=${this.configService.get('AZURE_AD_STATE')}` +
      `&nonce=${this.configService.get('AZURE_AD_NONCE')}`;
    return url;
  }

  public async handleAzureCallback(code: string) {
    const params = new URLSearchParams();
    params.append('client_id', this.configService.get('AZURE_AD_CLIENT_ID'));
    params.append('scope', this.configService.get('AZURE_AD_SCOPE'));
    params.append('code', code);
    params.append(
      'redirect_uri',
      this.configService.get('AZURE_AD_REDIRECT_URI'),
    );
    params.append('grant_type', 'authorization_code');
    params.append(
      'client_secret',
      this.configService.get('AZURE_AD_CLIENT_SECRET_VALUE'),
    );
    const token = (await this.axiosClass.post(
      this.configService.get('AZURE_AD_TOKEN_V2'),
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )) as any;

    return await this.proxyRabbitMQ.operations(
      AuthUsersMsgEnum.LOGIN_USER_CUSTOM,
      {
        typeAuth: CustomAuthEnum.AZURE_AD,
        token: token.access_token,
      },
    );
  }
}
