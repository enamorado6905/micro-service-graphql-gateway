import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ConfigSigUpDto } from './dto/confirm-sig-up.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { ExchangeCodeForTokensDto } from './dto/exchange-code-for-token.dto';
import { RemoveUserAuthDto } from './dto/remove-user.dto';
import { SigUpDto } from './dto/sig-up-auth.dto';
import { ResendConfirmationCodeAuthDto } from './dto/resend-confirmation-code-auth.dto';
import { CognitoRepository } from './repository/cognito.service.class';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { SignInRefreshAuthInterface } from './interfaces/sign-in-refresh-auth.interface';
import { InitiateAccountRecoveryDto } from './dto/initiate-account-recovery.dto';
import { ConfirmForgotPasswordInterface } from './interfaces/confirm-forgot-password.interface';
import { InitiateAccountRecoveryInterface } from './interfaces/initiate-account-recovery.dto';
import { ConfirmAccountRecoveryDto } from './dto/confirm-account-recovery.dto';

/**
 * The `AuthService` class provides methods for managing user authentication in the application.
 *
 * This class uses the `ProxyRabbitMQ` utility class to communicate with a RabbitMQ server.
 * The `ProxyRabbitMQ` instance is created in the constructor of the class and is used in
 * all methods that need to communicate with the RabbitMQ server.
 *
 * The `@Injectable()` decorator is used to mark the class as a provider that can be managed by
 * the NestJS dependency injection container.
 */
@Injectable()
export class AuthCognitoService {
  /**
   * The constructor of the `AuthService` class.
   *
   * The constructor creates a new instance of the `ProxyRabbitMQ` utility class with the
   * `RabbitMqEnum.authUsersQueue` parameter, which specifies the name of the RabbitMQ queue
   * to use for user authentication operations.
   *
   */
  constructor(private readonly cognitoRepository: CognitoRepository) {}

  /**
   * The `registerUserCognito` method registers a new user in the Cognito user pool.
   *
   * @param {SigUpDto} sigUpDto - An object that contains the data for the user to register.
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
    return await this.cognitoRepository.registerUserCognito(sigUpDto);
  }

  /**
   * Confirms a user's registration in the Cognito user pool.
   *
   * @param {ConfigSigUpDto} configSigUpDto - An object containing the confirmation code and any additional attributes required for user confirmation.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the user's registration is confirmed successfully, and `false` otherwise.
   *
   * @description
   * This function uses the `cognitoRepository` to confirm a user's registration in the Cognito user pool.
   * It takes a `ConfigSigUpDto` object as a parameter, which contains the `confirmationCode` and any additional attributes required for user confirmation.
   * The function then calls the `confirmSignUpCognito` method of the `cognitoRepository` with the `configSigUpDto`
   * and returns the result of the operation.
   *
   * @example
   * const configSigUpDto = { confirmationCode: '123456', attributeName: 'custom:attribute', attributeValue: 'example' };
   * const result = await authService.confirmSignUpCognito(configSigUpDto);
   */
  public async confirmSignUpCognito(
    configSigUpDto: ConfigSigUpDto,
  ): Promise<boolean> {
    return await this.cognitoRepository.confirmSignUpCognito(configSigUpDto);
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
    return await this.cognitoRepository.loginUserCognito(loginAuthDto);
  }

  /**
   * Refreshes the user's access and refresh tokens using the Cognito service.
   *
   * @param {RefreshAuthDto} refreshAuthDto - An object containing the refresh token to be used for token refresh.
   * @returns {Promise<RefreshAuthInterface>} A promise that resolves to the result of the refresh operation.
   * The result will contain the refreshed access and refresh tokens if the refresh is successful.
   *
   * @description
   * This function uses the `cognitoRepository` to refresh the user's access and refresh tokens.
   * It takes a `RefreshAuthDto` object as a parameter, which contains the `refreshToken` to be used for token refresh.
   * The function then calls the `refreshUserCognito` method of the `cognitoRepository` with the `refreshToken`
   * and returns the result of the operation.
   *
   * @example
   * const refreshAuthDto = { refreshToken: 'your_refresh_token' };
   * const result = await authService.refreshUserCognito(refreshAuthDto);
   */
  public async refreshUserCognito(
    refreshAuthDto: RefreshAuthDto,
  ): Promise<SignInRefreshAuthInterface> {
    return await this.cognitoRepository.refreshUserCognito(refreshAuthDto);
  }

  /**
   * Exchanges an authorization code for access and refresh tokens using the Cognito service.
   *
   * @param {ExchangeCodeForTokensDto} exchangeCodeForTokensDto - An object containing the authorization code to be exchanged.
   * @returns {Promise<any>} A promise that resolves to the result of the exchange operation.
   * The result will contain the access and refresh tokens if the exchange is successful.
   *
   * @description
   * This function uses the `cognitoRepository` to exchange an authorization code for access and refresh tokens.
   * It takes an `ExchangeCodeForTokensDto` object as a parameter, which contains the `authorizationCode` to be exchanged.
   * The function then calls the `exchangeCodeForTokenCognito` method of the `cognitoRepository` with the `authorizationCode`
   * and returns the result of the operation.
   *
   * @example
   * const exchangeCodeForTokensDto = { authorizationCode: '1234567890' };
   * const result = await authService.exchangeCodeForTokenCognito(exchangeCodeForTokensDto);
   */
  public async exchangeCodeForTokenCognito(
    exchangeCodeForTokensDto: ExchangeCodeForTokensDto,
  ): Promise<any> {
    return this.cognitoRepository.exchangeCodeForTokenCognito(
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
   * 1. It calls the `operations` method of the `cognitoProxyRabbitMQ` instance with `AuthUsersMsgEnum.LOGOUT_USER` as the operation type.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const result = await authService.logoutUserCognito();
   */
  public async logoutUserCognito(
    logoutAuthDto: LogoutAuthDto,
  ): Promise<boolean> {
    return this.cognitoRepository.logoutUserCognito(logoutAuthDto);
  }

  /**
   * The `removeUserCognito` method removes a user from the Cognito user pool.
   *
   * @param {RemoveUserAuthDto} removeUserAuthDto - An object that contains the data for the user to remove.
   * @returns {Promise<any>} A promise that resolves to the result of the removal operation.
   *
   * @description
   * This function uses the `cognitoRepository` to remove a user from the Cognito user pool.
   * It takes a `RemoveUserAuthDto` object as a parameter, which contains the `userName` of the user to be removed.
   * The function then calls the `removeUserCognito` method of the `cognitoRepository` with the `userName`
   * and returns the result of the operation.
   *
   * @example
   * const removeUserAuthDto = { userName: 'user@example.com' };
   * const result = await authService.removeUserCognito(removeUserAuthDto);
   */
  public async removeUserCognito(
    removeUserAuthDto: RemoveUserAuthDto,
  ): Promise<boolean> {
    return this.cognitoRepository.removeUserCognito(removeUserAuthDto);
  }

  /**
   * Resends the confirmation code for validating signup.
   *
   * @param {ResendConfirmationCodeAuthDto} resendConfirmationCodeAuthDto - An object that contains the data for resending the confirmation code.
   * @returns {Promise<boolean>} A promise that resolves to the result of the resend operation.
   *
   * @description
   * This function uses the `cognitoRepository` to resend the confirmation code for a user in the Cognito user pool.
   * It takes a `ResendConfirmationCodeAuthDto` object as a parameter, which contains the `userName` of the user to resend the confirmation code to.
   * The function then calls the `resendConfirmationCodeCognito` method of the `cognitoRepository` with the `userName`
   * and returns the result of the operation.
   *
   * @example
   * const resendConfirmationCodeAuthDto = { userName: 'user@example.com' };
   * const result = await authService.resendConfirmationCodeCognito(resendConfirmationCodeAuthDto);
   */
  public async resendConfirmationCodeCognito(
    resendConfirmationCodeAuthDto: ResendConfirmationCodeAuthDto,
  ): Promise<boolean> {
    return this.cognitoRepository.resendConfirmationCodeCognito(
      resendConfirmationCodeAuthDto,
    );
  }

  /**
   * Initiates the account recovery process for a user in the Cognito user pool.
   *
   * @param {InitiateAccountRecoveryDto} initiateAccountRecoveryDto - An object containing the user's email address or phone number for account recovery.
   * @returns {Promise<InitiateAccountRecoveryInterface>} A promise that resolves to an object containing the recovery challenge name and the user's ID.
   *
   * @description
   * This function uses the `cognitoRepository` to initiate the account recovery process for a user in the Cognito user pool.
   * It takes an `InitiateAccountRecoveryDto` object as a parameter, which contains the user's email address or phone number for account recovery.
   * The function then calls the `initiateAccountRecoveryCognito` method of the `cognitoRepository` with the `initiateAccountRecoveryDto`
   * and returns the result of the operation.
   *
   * @example
   * const initiateAccountRecoveryDto = { username: 'user@example.com' };
   * const result = await authService.initiateAccountRecoveryCognito(initiateAccountRecoveryDto);
   */
  public async initiateAccountRecoveryCognito(
    initiateAccountRecoveryDto: InitiateAccountRecoveryDto,
  ): Promise<InitiateAccountRecoveryInterface> {
    return this.cognitoRepository.initiateAccountRecoveryCognito(
      initiateAccountRecoveryDto,
    );
  }

  /**
   * Confirms the account recovery process for a user in the Cognito user pool.
   *
   * @param {ConfirmAccountRecoveryDto} confirmAccountRecoveryDto - An object containing the confirmation code and the user's ID for account recovery.
   * @returns {Promise<ConfirmForgotPasswordInterface>} A promise that resolves to an object containing the status of the account recovery confirmation.
   *
   * @description
   * This function uses the `cognitoRepository` to confirm the account recovery process for a user in the Cognito user pool.
   * It takes a `ConfirmAccountRecoveryDto` object as a parameter, which contains the `confirmationCode` and the `userId` for account recovery.
   * The function then calls the `confirmAccountRecoveryCognito` method of the `cognitoRepository` with the `confirmAccountRecoveryDto`
   * and returns the result of the operation.
   *
   * @example
   * const confirmAccountRecoveryDto = { userId: '1234567890', confirmationCode: '123456' };
   * const result = await authService.confirmAccountRecoveryCognito(confirmAccountRecoveryDto);
   */
  public async confirmAccountRecoveryCognito(
    confirmAccountRecoveryDto: ConfirmAccountRecoveryDto,
  ): Promise<ConfirmForgotPasswordInterface> {
    return this.cognitoRepository.confirmAccountRecoveryCognito(
      confirmAccountRecoveryDto,
    );
  }
}
