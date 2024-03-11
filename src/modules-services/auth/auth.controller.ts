import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ConfigSigUpDto } from './dto/confirm-sig-up.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

/**
 * The `AuthController` class provides endpoints for managing user authentication in the application.
 *
 * This class uses the `AuthService` to perform the actual operations related to user authentication.
 *
 * The `@Controller()` decorator is used to mark the class as a controller that can handle incoming HTTP requests.
 */
@Controller('auth')
export class AuthController {
  /**
   * The constructor of the `AuthController` class.
   *
   * The constructor injects an instance of the `AuthService` into the class.
   *
   * @param authService - The `AuthService` to inject into the class.
   */
  constructor(private readonly authService: AuthService) {}

  @Get('test-auth-jwt')
  @UseGuards(JwtAuthGuard)
  getProtectedResource() {
    return { message: 'This is a protected resource.' };
  }

  /**
   * The `registerUser` method handles the register user operation.
   *
   * @param {CreateAuthDto} loginAuthDto - The DTO containing the user's username and password.
   * @returns {Promise<any>} A promise that resolves to the registered user.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `registerUserCognito` method of the `authService` with the `createAuthDto`.
   * 2. It returns the result of the `registerUserCognito` method.
   *
   * @example
   * const createAuthDto = { username: 'test', password: 'password' };
   * const user = await authController.registerUser(createAuthDto);
   */
  @Post('login')
  loginUserCognito(@Body() loginAuthDto: LoginAuthDto): Promise<any> {
    return this.authService.loginUserCognito(loginAuthDto);
  }

  /**
   * The `loginUser` method handles the login user operation.
   *
   * @param {CreateAuthDto} createAuthDto - The DTO containing the user's username and password.
   * @returns {Promise<any>} A promise that resolves to the logged in user.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `loginUserCognito` method of the `authService` with the `loginAuthDto`.
   * 2. It returns the result of the `loginUserCognito` method.
   *
   * @example
   * const loginAuthDto = { username: 'test', password: 'password' };
   * const user = await authController.loginUser(loginAuthDto);
   */
  @Post('register')
  registerUserCognito(@Body() createAuthDto: CreateAuthDto): Promise<any> {
    return this.authService.registerUserCognito(createAuthDto);
  }

  /**
   * Confirms the sign up of a user.
   *
   * @param {ConfigSigUpDto} configSigUpDto - The DTO containing the user's username and confirmation code.
   * @returns {Promise<any>} A promise that resolves when the user's sign up is confirmed.
   *
   * @description
   * The function works as follows:
   * 1. It calls `this.authService.confirmSignUpCognito(configSigUpDto)`, which is expected to be an operation that confirms the sign up of a user.
   * 2. It returns the result of the `confirmSignUpCognito` method.
   *
   * @example
   * const configSigUpDto = { username: 'test', code: 'confirmation_code' };
   * await authController.confirmSignUpCognito(configSigUpDto);
   */
  @Post('confirm-sign-up')
  confirmSignUpCognito(@Body() configSigUpDto: ConfigSigUpDto): Promise<any> {
    return this.authService.confirmSignUpCognito(configSigUpDto);
  }

  /**
   * Logs out a user.
   *
   * @param {LogoutAuthDto} logoutAuthDto - The DTO containing the user's access token.
   * @returns {Promise<any>} A promise that resolves when the user is logged out.
   *
   * @description
   * The function works as follows:
   * 1. It calls `this.authService.logoutUserCognito(logoutAuthDto)`, which is expected to be an operation that logs out a user.
   * 2. It returns the result of the `logoutUserCognito` method.
   *
   * @example
   * const logoutAuthDto = { token: 'access_token' };
   * await authController.logoutUserCognito(logoutAuthDto);
   */
  @Post('logout')
  logoutUserCognito(@Body() logoutAuthDto: LogoutAuthDto): Promise<any> {
    return this.authService.logoutUserCognito(logoutAuthDto);
  }
}
