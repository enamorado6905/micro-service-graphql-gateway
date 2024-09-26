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

  @Mutation(() => Boolean, { name: AuthResolverEnum.AUTH_REMOVE_COGNITO })
  public async removeUserCognito(
    @Args('removeUserAuth') removeUserAuthDto: RemoveUserAuthDto,
  ): Promise<boolean> {
    return await this.authCognitoService.removeUserCognito(removeUserAuthDto);
  }

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
}
