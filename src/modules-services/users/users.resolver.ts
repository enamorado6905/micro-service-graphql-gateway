import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindOneUserInput } from './dto/find-one-user.input';
import { PaginatedAuthor, User } from './entities/user.entity';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { PasswordEncryptionInterceptor } from '../../common/intercertors/password-encryption.interceptor';
import { RemovePasswordInterceptor } from '../../common/intercertors/remove-password.interceptor';
import { UserResolverEnum } from '../../common/enum/system/name-resolver/user-resolver.enum';
import { GqlAuthGuard } from '../../common/guards/graphql.guard';
import { FilterByIdUserInput } from './dto/filter-by-id.input';

/**
 * The `UsersResolver` class provides GraphQL resolvers for managing users in the application.
 *
 * This class implements the `AbstractMethodOperation<User>` interface, which means it provides
 * Methods for creating, retrieving, updating, and deleting `User` entities.
 *
 * The class uses the `UsersService` to perform operations on `User` entities. The `UsersService`
 * Instance is injected into the class through the constructor.
 *
 * The `@Resolver(() => User)` decorator is used to mark the class as a GraphQL resolver for the
 * `User` type.
 */
@Resolver(() => User)
@UseGuards(GqlAuthGuard)
@UseInterceptors(RemovePasswordInterceptor)
export class UsersResolver {
  /**
   * The constructor of the `UsersResolver` class.
   *
   * The constructor injects an instance of the `UsersService` into the class. This service is used
   * Yo perform operations on `User` entities.
   *
   * @param usersService - The `UsersService` to inject into the class.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Mutation to create a new user.
   * @param createUserInput - The input data for creating a user.
   * @returns The created user.
   */
  @Mutation(() => User, { name: UserResolverEnum.USER_REGISTER })
  @UseInterceptors(PasswordEncryptionInterceptor)
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  /**
   * Query to get the total number of users.
   * @returns The total number of users.
   */
  @Query(() => Number, { name: UserResolverEnum.USER_TOTAL })
  async total(): Promise<number> {
    return await this.usersService.total();
  }

  /**
   * Query to find all users with pagination.
   * @param paginationArgsDto - The pagination arguments.
   * @returns The paginated list of users.
   */
  @Query(() => PaginatedAuthor, { name: UserResolverEnum.USER_LIST })
  @UseInterceptors(RemovePasswordInterceptor)
  async find(@Args() paginationArgsDto: PaginationArgsDto) {
    return await this.usersService.find(paginationArgsDto);
  }

  /**
   * Query to find a user by ID.
   * @param id - The ID of the user.
   * @returns The found user.
   */
  @Query(() => User, { name: UserResolverEnum.USER_ID })
  @UseInterceptors(RemovePasswordInterceptor)
  async getById(@Args('id') id: FilterByIdUserInput): Promise<User> {
    return await this.usersService.getById(id.id);
  }

  /**
   * Mutation to find a user by filter.
   * @param filter - The filter criteria.
   * @returns The found user.
   */
  @Query(() => User, { name: UserResolverEnum.USER_FIND_ONE })
  async getOne(@Args('filter') filter: FindOneUserInput): Promise<User> {
    return await this.usersService.getOne(filter);
  }

  /**
   * Mutation to update a user.
   * @param updateUserInput - The input data for updating a user.
   * @returns The updated user.
   */
  @Mutation(() => User, { name: UserResolverEnum.USER_UPDATE })
  @UseInterceptors(RemovePasswordInterceptor)
  async update(
    @Args('id') id: FilterByIdUserInput,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id.id, updateUserInput);
  }

  /**
   * Mutation to remove a user by ID.
   * @param id - The ID of the user to remove.
   * @returns The removed user.
   */
  @Mutation(() => User, { name: UserResolverEnum.USER_REMOVE })
  @UseInterceptors(RemovePasswordInterceptor)
  async delete(@Args('id') id: FilterByIdUserInput): Promise<User> {
    return this.usersService.delete(id.id);
  }
}
