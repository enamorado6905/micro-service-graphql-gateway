import { Injectable } from '@nestjs/common';
import { SigUpDto } from '../../../modules-services/auth-cognito/dto/sig-up-auth.dto';
import { ConfigSigUpDto } from '../../../modules-services/auth-cognito/dto/confirm-sig-up.dto';
import { LoginAuthDto } from '../../../modules-services/auth-cognito/dto/login-auth.dto';
import { ExchangeCodeForTokensDto } from '../../../modules-services/auth-cognito/dto/exchange-code-for-token.dto';
import { LogoutAuthDto } from '../../../modules-services/auth-cognito/dto/logout-auth.dto';
import { RemoveUserAuthDto } from '../../../modules-services/auth-cognito/dto/remove-user.dto';
import { ResendConfirmationCodeAuthDto } from '../../../modules-services/auth-cognito/dto/resend-confirmation-code-auth.dto';
import { ProxyRabbitMQ } from '../../../common/class/connection/proxy-rabbit-mq.class';
import { RabbitMqEnum } from '../../../common/enum/msg/rabbit-mq.enum';
import { AuthUsersMsgEnum } from '../../../common/enum/msg/auth-users.enum';
import { RefreshAuthDto } from '../dto/refresh-auth.dto';
import { SignInRefreshAuthInterface } from '../interfaces/sign-in-refresh-auth.interface';

@Injectable()
export class CognitoRepository {
  /**
   * The `cognitoProxyRabbitMQ` property is an instance of the `ProxyRabbitMQ` utility class.
   * This property is used to communicate with a RabbitMQ server.
   * The `ProxyRabbitMQ` instance is created with the `RabbitMqEnum.usersQueue` parameter, which
   * Specifies the name of the RabbitMQ queue to use.
   */
  private readonly cognitoProxyRabbitMQ = new ProxyRabbitMQ(
    RabbitMqEnum.cognitoQueue,
  );

  constructor() {}

  /**
   * The `registerUserCognito` method registers a new user in the Cognito user pool.
   *
   * @param {CreateAuthDto} sigUpDto - An object that contains the data for the user to register.
   * @returns {Promise<any>} A promise that resolves to the result of the registration operation.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `cognitoProxyRabbitMQ` instance with `AuthUsersMsgEnum.CREATE` as the operation type and `createAuthDto` as the data.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const createAuthDto = { surnames: 'test', password: 'password' };
   * const result = await authService.registerUserCognito(createAuthDto);
   */
  public async registerUserCognito(sigUpDto: SigUpDto): Promise<any> {
    return await this.cognitoProxyRabbitMQ.operations(
      AuthUsersMsgEnum.CREATE,
      sigUpDto,
    );
  }

  public async confirmSignUpCognito(
    configSigUpDto: ConfigSigUpDto,
  ): Promise<boolean> {
    return await this.cognitoProxyRabbitMQ.operations(
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
   * 1. It calls the `operations` method of the `cognitoProxyRabbitMQ` instance with `AuthUsersMsgEnum.LOGIN_USER` as the operation type and `loginAuthDto` as the data.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const loginAuthDto = { surnames: 'test', password: 'password' };
   * const result = await authService.loginUserCognito(loginAuthDto);
   */
  public async loginUserCognito(
    loginAuthDto: LoginAuthDto,
  ): Promise<SignInRefreshAuthInterface> {
    return await this.cognitoProxyRabbitMQ.operations(
      AuthUsersMsgEnum.LOGIN_USER,
      loginAuthDto,
    );
  }

  public async exchangeCodeForTokenCognito(
    exchangeCodeForTokensDto: ExchangeCodeForTokensDto,
  ): Promise<any> {
    return await this.cognitoProxyRabbitMQ.operations(
      AuthUsersMsgEnum.FIND_TOKEN_FOR_CODE,
      exchangeCodeForTokensDto,
    );
  }

  /**
   * The `logoutUserCognito` method logs out a user from the Cognito user pool.
   *
   * @returns {Promise<LogoutObjectType>} A promise that resolves to the result of the logout operation.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `cognitoProxyRabbitMQ` instance with `AuthUsersMsgEnum.LOGOUT_USER` as the operation type.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const result = await authService.logoutUserCognito();
   */
  public async logoutUserCognito(
    logoutAuthDto: LogoutAuthDto,
  ): Promise<boolean> {
    return await this.cognitoProxyRabbitMQ.operations(
      AuthUsersMsgEnum.LOGOUT_USER,
      logoutAuthDto,
    );
  }

  /**
   * Refreshes the user's access token in the Cognito user pool.
   *
   * @param {RefreshAuthDto} refreshAuthDto - An object containing the refresh token to be used for token refresh.
   * @returns {Promise<RefreshAuthInterface>} A promise that resolves to the result of the token refresh operation.
   *
   * @description
   * This function sends a message to the RabbitMQ queue specified by `RabbitMqEnum.cognitoQueue` with the operation type
   * `AuthUsersMsgEnum.REFRESH_USER` and the `refreshAuthDto` as the data. It then awaits the response from the RabbitMQ server,
   * which indicates whether the token refresh was successful.
   *
   * @example
   * const refreshAuthDto = { refreshToken: 'your_refresh_token' };
   * const result = await authService.refreshUserCognito(refreshAuthDto);
   */
  public async refreshUserCognito(
    refreshAuthDto: RefreshAuthDto,
  ): Promise<SignInRefreshAuthInterface> {
    return await this.cognitoProxyRabbitMQ.operations(
      AuthUsersMsgEnum.REFRESH_USER,
      refreshAuthDto,
    );
  }

  /**
   * The `removeUserCognito` method removes a user from the Cognito user pool.
   *
   * @param {RemoveUserAuthDto} removeUserAuthDto - The remove user data.
   * @returns {Promise<any>} A promise that resolves to the result of the user removal operation.
   *
   * @description
   * This function communicates with a RabbitMQ server to remove a user from the Cognito user pool.
   * It uses the `ProxyRabbitMQ` utility class to send a message to the RabbitMQ queue specified by
   * `RabbitMqEnum.cognitoQueue` with the operation type `AuthUsersMsgEnum.CONFIG_REMOVE_USER` and
   * the user's email as the data.
   *
   * @example
   * const email = 'user@example.com';
   * const result = await authService.removeUserCognito(email);
   */
  public async removeUserCognito(
    removeUserAuthDto: RemoveUserAuthDto,
  ): Promise<boolean> {
    return await this.cognitoProxyRabbitMQ.operations(
      AuthUsersMsgEnum.CONFIG_REMOVE_USER,
      removeUserAuthDto,
    );
  }

  /**
   * The `removeUserCognito` method removes a user from the Cognito user pool.
   *
   * @param {string} email - The email of the user to be removed.
   * @returns {Promise<any>} A promise that resolves to the result of the user removal operation.
   *
   * @description
   * This function communicates with a RabbitMQ server to remove a user from the Cognito user pool.
   * It uses the `ProxyRabbitMQ` utility class to send a message to the RabbitMQ queue specified by
   * `RabbitMqEnum.cognitoQueue` with the operation type `AuthUsersMsgEnum.CONFIG_REMOVE_USER` and
   * the user's email as the data.
   *
   * @example
   * const email = 'user@example.com';
   * const result = await authService.removeUserCognito(email);
   */
  public async resendConfirmationCodeCognito(
    resendConfirmationCodeAuthDto: ResendConfirmationCodeAuthDto,
  ): Promise<boolean> {
    return await this.cognitoProxyRabbitMQ.operations(
      AuthUsersMsgEnum.CONFIG_RESEND_CONFIRMATION_CODE_USER,
      resendConfirmationCodeAuthDto,
    );
  }
}
