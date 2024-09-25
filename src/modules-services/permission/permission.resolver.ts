import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { PaginatedPermission, Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/graphql.guard';
import { FindOnePermissionInput } from './dto/find-one-permission.input';
import { PermissionResolverEnum } from '../../common/enum/system/name-resolver/permission-resolver';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { FilterByIdPermissionInput } from './dto/filter-by-id.input';

/**
 * The `PermissionResolver` class provides GraphQL resolvers for managing permission in the application.
 *
 * This class implements the `AbstractMethodOperation<Permission>` interface, which means it provides
 * Methods for creating, retrieving, updating, and deleting `Permission` entities.
 *
 * The class uses the `PermissionService` to perform operations on `Permission` entities. The `PermissionService`
 * Instance is injected into the class through the constructor.
 *
 * The `@Resolver(() => Permission)` decorator is used to mark the class as a GraphQL resolver for the
 * `Permission` type.
 */
@Resolver(() => Permission)
@UseGuards(GqlAuthGuard)
export class PermissionResolver {
  /**
   * The constructor of the `PermissionResolver` class.
   *
   * The constructor injects an instance of the `PermissionService` into the class. This service is used
   * Yo perform operations on `Permission` entities.
   *
   * @param permissionService - The `PermissionService` to inject into the class.
   */
  constructor(private readonly permissionService: PermissionService) {}

  /**
   * Mutation to create a new permission.
   * @param createPermissionInput - The input data for creating a permission.
   * @returns The created permission.
   */
  @Mutation(() => Permission, {
    name: PermissionResolverEnum.PERMISSION_REGISTER,
  })
  async create(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ): Promise<Permission> {
    return await this.permissionService.create(createPermissionInput);
  }

  /**
   * Query to get the total number of permission.
   * @returns The total number of permission.
   */
  @Query(() => Number, { name: PermissionResolverEnum.PERMISSION_TOTAL })
  async total(): Promise<number> {
    return await this.permissionService.total();
  }

  /**
   * Query to find all permission with pagination.
   * @param paginationArgsDto - The pagination arguments.
   * @returns The paginated list of permission.
   */
  @Query(() => PaginatedPermission, {
    name: PermissionResolverEnum.PERMISSION_LIST,
  })
  async find(@Args() paginationArgsDto: PaginationArgsDto) {
    return await this.permissionService.find(paginationArgsDto);
  }

  /**
   * Query to find a permission by ID.
   * @param id - The ID of the permission.
   * @returns The found permission.
   */
  @Query(() => Permission, { name: PermissionResolverEnum.PERMISSION_ID })
  async getById(
    @Args('id') id: FilterByIdPermissionInput,
  ): Promise<Permission> {
    return await this.permissionService.getById(id.id);
  }

  /**
   * Mutation to find a permission by filter.
   * @param filter - The filter criteria.
   * @returns The found permission.
   */
  @Query(() => Permission, { name: PermissionResolverEnum.PERMISSION_FIND_ONE })
  async getOne(
    @Args('filter') filter: FindOnePermissionInput,
  ): Promise<Permission> {
    return await this.permissionService.getOne(filter);
  }

  /**
   * Mutation to update a permission.
   * @param updatePermissionInput - The input data for updating a permission.
   * @returns The updated permission.
   */
  @Mutation(() => Permission, {
    name: PermissionResolverEnum.PERMISSION_UPDATE,
  })
  async update(
    @Args('id') id: FilterByIdPermissionInput,
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
  ): Promise<Permission> {
    return this.permissionService.update(id.id, updatePermissionInput);
  }

  /**
   * Mutation to remove a permission by ID.
   * @param id - The ID of the permission to remove.
   * @returns The removed permission.
   */
  @Mutation(() => Permission, {
    name: PermissionResolverEnum.PERMISSION_REMOVE,
  })
  async delete(@Args('id') id: FilterByIdPermissionInput): Promise<Permission> {
    return this.permissionService.delete(id.id);
  }
}
