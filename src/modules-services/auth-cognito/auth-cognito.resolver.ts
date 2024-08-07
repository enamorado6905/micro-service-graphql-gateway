import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthCognitoService } from './auth-cognito.service';
import { User } from '../users/entities/user.entity';
import { AuthResolverEnum } from '../../common/enum/system/name-resolver/auth-resolver.enum';
import { CreateUserInput } from '../users/dto/create-user.input';
import { ConfigSigUpDto } from './dto/confirm-sig-up.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignInInterface } from '../../common/interfaces/sign-in.interface';

@Resolver()
export class AuthCognitoResolver {
  constructor(private readonly authCognitoService: AuthCognitoService) {}

  /**
   * A protected resource.
   * @returns The protected resource.
   */
  public getProtectedResource() {
    return { message: 'This is a protected resource.' };
  }

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
   * @param {CreateUserInput} createUserInput - The input data for creating a user.
   * @returns The created user and register user to cognito.
   */
  @Mutation(() => User, { name: AuthResolverEnum.AUTH_COGNITO })
  public async confirmSignUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.authCognitoService.registerUserCognito(createUserInput);
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
}
