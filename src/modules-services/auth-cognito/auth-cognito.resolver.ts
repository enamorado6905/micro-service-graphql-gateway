import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthCognitoService } from './auth-cognito.service';
import { User } from '../users/entities/user.entity';
import { AuthResolverEnum } from '../../common/enum/system/name-resolver/auth-resolver.enum';
import { ConfigSigUpDto } from './dto/confirm-sig-up.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignInInterface } from '../../common/interfaces/sign-in.interface';
import { RemoveUserAuthDto } from './dto/remove-user.dto';
import { SigUpDto } from './dto/sig-up-auth.dto';
import { ResendConfirmationCodeAuthDto } from './dto/resend-confirmation-code-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';

@Resolver()
export class AuthCognitoResolver {
  constructor(private readonly authCognitoService: AuthCognitoService) {}

  /**
   * Mutation to login a user.
   * @param {LoginAuthDto} loginAuthDto - The input data for creating a user.
   * @returns The created user and register user to cognito.
   */
  @Mutation(() => SignInInterface, { name: AuthResolverEnum.LOGIN_COGNITO })
  public async login(@Args('loginAuthDto') loginAuthDto: LoginAuthDto) {
    return await this.authCognitoService.loginUserCognito(loginAuthDto);
  }

  /**
   * Mutation to register a user.
   * @param {SigUpDto} sigUpDto - The input data for creating a user.
   * @returns The created user and register user to cognito.
   */
  @Mutation(() => User, { name: AuthResolverEnum.AUTH_COGNITO })
  public async confirmSignUp(
    @Args('createUserInput') sigUpDto: SigUpDto,
  ): Promise<User> {
    return this.authCognitoService.registerUserCognito(sigUpDto);
  }

  /**
   * Mutation to validate a registration.
   * @param {ConfigSigUpDto} configSigUpDto - The input data for validating a registration.
   * @returns The validation result.
   */
  @Query(() => Boolean, {
    name: AuthResolverEnum.AUTH_VALIDATE_REGISTRATION,
  })
  public async validateRegistration(
    @Args('configSigUpDto') configSigUpDto: ConfigSigUpDto,
  ): Promise<boolean> {
    return this.authCognitoService.confirmSignUpCognito(configSigUpDto);
  }

  /**
   * Mutation to remove a user.
   * @param {RemoveUserAuthDto} removeUserAuthDto - The input data for removing a user.
   * @returns A promise that resolves to a boolean value.
   */
  @Mutation(() => Boolean, { name: AuthResolverEnum.AUTH_REMOVE_COGNITO })
  public async removeUserCognito(
    @Args('removeUserAuth') removeUserAuthDto: RemoveUserAuthDto,
  ): Promise<boolean> {
    return await this.authCognitoService.removeUserCognito(removeUserAuthDto);
  }

  /**
   * Mutation to resend the confirmation code for a user's registration.
   *
   * @param resendConfirmationCodeAuthDto - The input data for resending the confirmation code.
   * This object should contain the user's email address or phone number.
   *
   * @returns A promise that resolves to a boolean value.
   * If the confirmation code is successfully resent, the promise resolves to `true`.
   * If there is an error during the resend process, the promise resolves to `false`.
   */
  @Mutation(() => Boolean, {
    name: AuthResolverEnum.RESEND_CONFIMATION_CODE_COGNITO,
  })
  public async resendConfirmationCodeCognito(
    @Args('resendConfirmationCodeAuth')
    resendConfirmationCodeAuthDto: ResendConfirmationCodeAuthDto,
  ): Promise<boolean> {
    return await this.authCognitoService.resendConfirmationCodeCognito(
      resendConfirmationCodeAuthDto,
    );
  }

  /**
   * Mutation to log out a user from the application.
   *
   * This function sends a request to the Cognito service to log out the user.
   * It takes a `LogoutAuthDto` object as a parameter, which contains the necessary
   * information to identify the user.
   *
   * @param logoutAuthDto - The input data for logging out a user.
   * This object should contain the user's unique identifier (e.g., username or access token).
   *
   * @returns A promise that resolves to a boolean value.
   * If the user is successfully logged out, the promise resolves to `true`.
   * If there is an error during the logout process, the promise resolves to `false`.
   */
  @Mutation(() => Boolean, {
    name: AuthResolverEnum.LOGOUT_COGNITO,
  })
  public async logoutUserCognito(
    @Args('logoutUserAuth')
    logoutAuthDto: LogoutAuthDto,
  ): Promise<boolean> {
    return await this.authCognitoService.logoutUserCognito(logoutAuthDto);
  }
}
