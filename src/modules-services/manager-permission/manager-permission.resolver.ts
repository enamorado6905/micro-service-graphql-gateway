import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ManagerPermissionService } from './manager-permission.service';
import { CreateManagerPermissionInput } from './dto/create-manager-permission.input';
import { UpdateManagerPermissionInput } from './dto/update-manager-permission.input';
import { ManagerPermission } from './entities/manager-permission.entity';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { PaginatedAuthor } from '../users/entities/user.entity';
import { FilterPermissionInput } from './dto/filter-manager-permission.input';
import { PaginateInterface } from '../../common/interfaces/paginated.interface';

/**
 * The `PermissionsResolver` class provides GraphQL resolvers for managing permissions in the application.
 *
 * This class implements the `AbstractMethodOperation<Permission>` interface, which means it provides
 * Methods for creating, retrieving, updating, and deleting `Permission` entities.
 *
 * The class uses the `PermissionsService` to perform operations on `Permission` entities. The `PermissionsService`
 * Instance is injected into the class through the constructor.
 *
 * The `@Resolver(() => Permission)` decorator is used to mark the class as a GraphQL resolver for the
 * `Permission` type.
 */
@Resolver('ManagerPermission')
export class ManagerPermissionResolver {
  /**
   * The constructor of the `PermissionsResolver` class.
   *
   * The constructor injects an instance of the `PermissionsService` into the class. This service is used
   * Yo perform operations on `Permission` entities.
   *
   * @param permissionsService - The `PermissionsService` to inject into the class.
   */
  constructor(
    private readonly managerPermissionService: ManagerPermissionService,
  ) {}

  /**
   * The `create` method handles the operation of creating a new manager permission.
   *
   * @param {CreateManagerPermissionInput} createPermissionInput - The input object containing the data of the manager permission to create.
   * @returns {Promise<ManagerPermission>} A promise that resolves to the created manager permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `create` method of the `managerPermissionService` with the `createPermissionInput`.
   * 2. It returns the result of the `create` method.
   *
   * @example
   * const createPermissionInput = { name: 'test', description: 'test description' };
   * const managerPermission = await managerPermissionResolver.create(createPermissionInput);
   */
  @Mutation(() => ManagerPermission, { name: 'permissionRegister' })
  async create(
    @Args('createPermissionInput')
    createPermissionInput: CreateManagerPermissionInput,
  ): Promise<ManagerPermission> {
    return await this.managerPermissionService.create(createPermissionInput);
  }

  /**
   * The `total` method handles the operation of counting the total number of manager permissions.
   *
   * @returns {Promise<number>} A promise that resolves to the total number of manager permissions.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `total` method of the `managerPermissionService`.
   * 2. It returns the result of the `total` method.
   *
   * @example
   * const totalManagerPermissions = await managerPermissionResolver.total();
   */
  @Query(() => Number, { name: 'permissionTotal' })
  async total(): Promise<number> {
    return await this.managerPermissionService.total();
  }

  /**
   * The `find` method handles the operation of retrieving manager permissions with the provided pagination.
   *
   * @param {PaginationArgsDto} paginationArgsDto - The input object containing the pagination arguments.
   * @returns {Promise<PaginateInterface<ManagerPermission>>} A promise that resolves to a paginated list of manager permissions.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `find` method of the `managerPermissionService` with the `paginationArgsDto`.
   * 2. It returns the result of the `find` method.
   *
   * @example
   * const paginationArgsDto = { page: 1, limit: 10 };
   * const paginatedManagerPermissions = await managerPermissionResolver.find(paginationArgsDto);
   */
  @Query(() => PaginatedAuthor, { name: 'permissionList' })
  async find(
    @Args() paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<ManagerPermission>> {
    return await this.managerPermissionService.find(paginationArgsDto);
  }

  /**
   * The `getById` method handles the operation of retrieving a manager permission by its ID.
   *
   * @param {string} id - The ID of the manager permission to retrieve.
   * @returns {Promise<ManagerPermission>} A promise that resolves to the manager permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `getById` method of the `managerPermissionService` with the `id`.
   * 2. It returns the result of the `getById` method.
   *
   * @example
   * const id = '123';
   * const managerPermission = await managerPermissionResolver.getById(id);
   */
  @Query(() => ManagerPermission, { name: 'permissionId' })
  async getById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ManagerPermission> {
    return await this.managerPermissionService.getById(id);
  }

  /**
   * The `getOne` method handles the operation of retrieving a single manager permission that matches the provided filter.
   *
   * @param {FilterPermissionInput} filter - The input object containing the filter criteria.
   * @returns {Promise<ManagerPermission>} A promise that resolves to the manager permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `getOne` method of the `managerPermissionService` with the `filter`.
   * 2. It returns the result of the `getOne` method.
   *
   * @example
   * const filter = { name: 'test' };
   * const managerPermission = await managerPermissionResolver.getOne(filter);
   */
  @Mutation(() => ManagerPermission, { name: 'permissionFindOne' })
  async getOne(
    @Args('filter') filter: FilterPermissionInput,
  ): Promise<ManagerPermission> {
    return await this.managerPermissionService.getOne(filter);
  }

  /**
   * The `update` method handles the operation of updating a manager permission.
   *
   * @param {UpdateManagerPermissionInput} updatePermissionInput - The input object containing the data of the manager permission to update.
   * @returns {Promise<ManagerPermission>} A promise that resolves to the updated manager permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `update` method of the `managerPermissionService` with the `updatePermissionInput`.
   * 2. It returns the result of the `update` method.
   *
   * @example
   * const updatePermissionInput = { id: '123', name: 'test updated', description: 'test description updated' };
   * const updatedManagerPermission = await managerPermissionResolver.update(updatePermissionInput);
   */
  @Mutation(() => ManagerPermission, { name: 'permissionUpdate' })
  async update(
    @Args('updatePermissionInput')
    updatePermissionInput: UpdateManagerPermissionInput,
  ): Promise<ManagerPermission> {
    return this.managerPermissionService.update(updatePermissionInput);
  }

  /**
   * The `delete` method handles the operation of deleting a manager permission by its ID.
   *
   * @param {string} id - The ID of the manager permission to delete.
   * @returns {Promise<ManagerPermission>} A promise that resolves to the deleted manager permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `delete` method of the `managerPermissionService` with the `id`.
   * 2. It returns the result of the `delete` method.
   *
   * @example
   * const id = '123';
   * const deletedManagerPermission = await managerPermissionResolver.delete(id);
   */
  @Mutation(() => ManagerPermission, { name: 'permissionRemove' })
  async delete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ManagerPermission> {
    return this.managerPermissionService.delete(id);
  }
}
