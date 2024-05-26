import { Injectable } from '@nestjs/common';
import { SigUpDto } from './dto/sig-up-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ProxyRabbitMQ } from '../../common/util/class/proxy-rabbit-mq.class';
import { RabbitMqEnum } from '../../common/enum/msg/rabbit-mq.enum';
import { AuthUsersMsgEnum } from '../../common/enum/msg/auth-users.enum';
import { ConfigSigUpDto } from './dto/confirm-sig-up.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { ExchangeCodeForTokensDto } from './dto/exchange-code-for-token.dto';

/**
 * The `AuthService` class provides methods for managing user authentication in the application.
 *
 * This class uses the `ProxyRabbitMQ` utility class to communicate with a RabbitMQ server. The `ProxyRabbitMQ` instance is created in the constructor of the class and is used in all methods that need to communicate with the RabbitMQ server.
 *
 * The `@Injectable()` decorator is used to mark the class as a provider that can be managed by the NestJS dependency injection container.
 */
@Injectable()
export class AuthService {
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
  constructor() {}

  /**
   * The `registerUserCognito` method registers a new user in the Cognito user pool.
   *
   * @param {CreateAuthDto} createAuthDto - An object that contains the data for the user to register.
   * @returns {Promise<any>} A promise that resolves to the result of the registration operation.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` instance with `AuthUsersMsgEnum.CREATE` as the operation type and `createAuthDto` as the data.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const createAuthDto = { surnames: 'test', password: 'password' };
   * const result = await authService.registerUserCognito(createAuthDto);
   */
  public async registerUserCognito(sigUpDto: SigUpDto): Promise<any> {
    return await this.proxyRabbitMQ.operations(
      AuthUsersMsgEnum.CREATE,
      sigUpDto,
    );
  }

  public async confirmSignUpCognito(
    configSigUpDto: ConfigSigUpDto,
  ): Promise<any> {
    return await this.proxyRabbitMQ.operations(
      AuthUsersMsgEnum.CONFIG_SIGN_UP,
      configSigUpDto,
    );
  }

  /**
   * The `loginUserCognito` method logs in a user to the Cognito user pool.
   *
   * @param {LoginAuthDto} loginAuthDto - An object that contains the data for the user to log in.
   * @returns {Promise<any>} A promise that resolves to the result of the login operation.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` instance with `AuthUsersMsgEnum.LOGIN_USER` as the operation type and `loginAuthDto` as the data.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const loginAuthDto = { surnames: 'test', password: 'password' };
   * const result = await authService.loginUserCognito(loginAuthDto);
   */
  public async loginUserCognito(loginAuthDto: LoginAuthDto): Promise<any> {
    return await this.proxyRabbitMQ.operations(
      AuthUsersMsgEnum.LOGIN_USER,
      loginAuthDto,
    );
  }

  public async exchangeCodeForTokenCognito(
    exchangeCodeForTokensDto: ExchangeCodeForTokensDto,
  ): Promise<any> {
    return await this.proxyRabbitMQ.operations(
      AuthUsersMsgEnum.FIND_TOKEN_FOR_CODE,
      exchangeCodeForTokensDto,
    );
  }

  /**
   * The `logoutUserCognito` method logs out a user from the Cognito user pool.
   *
   * @returns {Promise<any>} A promise that resolves to the result of the logout operation.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` instance with `AuthUsersMsgEnum.LOGOUT_USER` as the operation type.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const result = await authService.logoutUserCognito();
   */
  public async logoutUserCognito(logoutAuthDto: LogoutAuthDto): Promise<any> {
    return await this.proxyRabbitMQ.operations(
      AuthUsersMsgEnum.LOGOUT_USER,
      logoutAuthDto,
    );
  }
}
