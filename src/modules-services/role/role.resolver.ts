import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { PaginatedRole, Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/graphql.guard';
import { FindOneRoleInput } from './dto/find-one-role.input';
import { RoleResolverEnum } from '../../common/enum/system/name-resolver/role-resolver.enum';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { FilterByIdRoleInput } from './dto/filter-by-id.input';

/**
 * The `RoleResolver` class provides GraphQL resolvers for managing role in the application.
 *
 * This class implements the `AbstractMethodOperation<Role>` interface, which means it provides
 * Methods for creating, retrieving, updating, and deleting `Role` entities.
 *
 * The class uses the `RoleService` to perform operations on `Role` entities. The `RoleService`
 * Instance is injected into the class through the constructor.
 *
 * The `@Resolver(() => Role)` decorator is used to mark the class as a GraphQL resolver for the
 * `Role` type.
 */
@Resolver(() => Role)
@UseGuards(GqlAuthGuard)
export class RoleResolver {
  /**
   * The constructor of the `RoleResolver` class.
   *
   * The constructor injects an instance of the `RoleService` into the class. This service is used
   * Yo perform operations on `Role` entities.
   *
   * @param roleService - The `RoleService` to inject into the class.
   */
  constructor(private readonly roleService: RoleService) {}

  /**
   * Mutation to create a new role.
   * @param createRoleInput - The input data for creating a role.
   * @returns The created role.
   */
  @Mutation(() => Role, { name: RoleResolverEnum.ROLE_REGISTER })
  async create(
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<Role> {
    return await this.roleService.create(createRoleInput);
  }

  /**
   * Query to get the total number of role.
   * @returns The total number of role.
   */
  @Query(() => Number, { name: RoleResolverEnum.ROLE_TOTAL })
  async total(): Promise<number> {
    return await this.roleService.total();
  }

  /**
   * Query to find all role with pagination.
   * @param paginationArgsDto - The pagination arguments.
   * @returns The paginated list of role.
   */
  @Query(() => PaginatedRole, { name: RoleResolverEnum.ROLE_LIST })
  async find(@Args() paginationArgsDto: PaginationArgsDto) {
    return await this.roleService.find(paginationArgsDto);
  }

  /**
   * Query to find a role by ID.
   * @param id - The ID of the role.
   * @returns The found role.
   */
  @Query(() => Role, { name: RoleResolverEnum.ROLE_ID })
  async getById(@Args('id') id: FilterByIdRoleInput): Promise<Role> {
    return await this.roleService.getById(id.id);
  }

  /**
   * Mutation to find a role by filter.
   * @param filter - The filter criteria.
   * @returns The found role.
   */
  @Query(() => Role, { name: RoleResolverEnum.ROLE_FIND_ONE })
  async getOne(@Args('filter') filter: FindOneRoleInput): Promise<Role> {
    return await this.roleService.getOne(filter);
  }

  /**
   * Mutation to update a role.
   * @param updateRoleInput - The input data for updating a role.
   * @returns The updated role.
   */
  @Mutation(() => Role, { name: RoleResolverEnum.ROLE_UPDATE })
  async update(
    @Args('id') id: FilterByIdRoleInput,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ): Promise<Role> {
    return this.roleService.update(id.id, updateRoleInput);
  }

  /**
   * Mutation to remove a role by ID.
   * @param id - The ID of the role to remove.
   * @returns The removed role.
   */
  @Mutation(() => Role, { name: RoleResolverEnum.ROLE_REMOVE })
  async delete(@Args('id') id: FilterByIdRoleInput): Promise<Role> {
    return this.roleService.delete(id.id);
  }
}
