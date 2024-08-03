import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ConfigSigUpDto } from './dto/confirm-sig-up.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { ExchangeCodeForTokensDto } from './dto/exchange-code-for-token.dto';
import { CognitoServiceClass } from '../../common/util/class/service/cognito.service.class';
import { UsersServiceClass } from '../../common/util/class/service/user.service.class';
import { CreateUserInput } from '../users/dto/create-user.input';
import { SignInInterface } from '../../common/interfaces/sign-in.interface';

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
  constructor(
    private readonly cognitoServiceClass: CognitoServiceClass,
    private readonly usersServiceClass: UsersServiceClass,
  ) {}

  /**
   * The `registerUserCognito` method registers a new user in the Cognito user pool.
   *
   * @param {CreateUserInput} createUserInput - An object that contains the data for the user to register.
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
  public async registerUserCognito(
    createUserInput: CreateUserInput,
  ): Promise<any> {
    await this.cognitoServiceClass.registerUserCognito({
      password: createUserInput.password,
      user: createUserInput.email,
    });
    return await this.usersServiceClass.create(createUserInput);
  }

  public async confirmSignUpCognito(
    configSigUpDto: ConfigSigUpDto,
  ): Promise<boolean> {
    return await this.cognitoServiceClass.confirmSignUpCognito(configSigUpDto);
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
  ): Promise<SignInInterface> {
    return await this.cognitoServiceClass.loginUserCognito(loginAuthDto);
  }

  public async exchangeCodeForTokenCognito(
    exchangeCodeForTokensDto: ExchangeCodeForTokensDto,
  ): Promise<any> {
    return this.cognitoServiceClass.exchangeCodeForTokenCognito(
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
  public async logoutUserCognito(logoutAuthDto: LogoutAuthDto): Promise<any> {
    return this.cognitoServiceClass.logoutUserCognito(logoutAuthDto);
  }
}
