import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ManagerRolesService } from './manager-roles.service';
import { CreateManagerRoleInput } from './dto/create-manager-role.input';
import { UpdateManagerRoleInput } from './dto/update-manager-role.input';
import { ManagerRole } from './entities/manager-role.entity';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { PaginatedAuthor } from '../users/entities/user.entity';
import { FilterRoleInput } from './dto/filter-manager-role.input';
import { PaginateInterface } from '../../common/interfaces/paginated.interface';

/**
 * The `RolesResolver` class provides GraphQL resolvers for managing roles in the application.
 *
 * This class implements the `AbstractMethodOperation<Role>` interface, which means it provides
 * Methods for creating, retrieving, updating, and deleting `Role` entities.
 *
 * The class uses the `RolesService` to perform operations on `Role` entities. The `RolesService`
 * Instance is injected into the class through the constructor.
 *
 * The `@Resolver(() => Role)` decorator is used to mark the class as a GraphQL resolver for the
 * `Role` type.
 */
@Resolver('ManagerRole')
export class ManagerRolesResolver {
  /**
   * The constructor of the `RolesResolver` class.
   *
   * The constructor injects an instance of the `RolesService` into the class. This service is used
   * Yo perform operations on `Role` entities.
   *
   * @param rolesService - The `RolesService` to inject into the class.
   */
  constructor(private readonly managerRoleService: ManagerRolesService) {}

  /**
   * The `create` method handles the operation of creating a new manager role.
   *
   * @param {CreateManagerRoleInput} createRoleInput - The input object containing the data of the manager role to create.
   * @returns {Promise<ManagerRole>} A promise that resolves to the created manager role.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `create` method of the `managerRoleService` with the `createRoleInput`.
   * 2. It returns the result of the `create` method.
   *
   * @example
   * const createRoleInput = { name: 'test', description: 'test description' };
   * const managerRole = await managerRoleResolver.create(createRoleInput);
   */
  @Mutation(() => ManagerRole, { name: 'roleRegister' })
  async create(
    @Args('createRoleInput')
    createRoleInput: CreateManagerRoleInput,
  ): Promise<ManagerRole> {
    return await this.managerRoleService.create(createRoleInput);
  }

  /**
   * The `total` method handles the operation of counting the total number of manager roles.
   *
   * @returns {Promise<number>} A promise that resolves to the total number of manager roles.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `total` method of the `managerRoleService`.
   * 2. It returns the result of the `total` method.
   *
   * @example
   * const totalManagerRoles = await managerRoleResolver.total();
   */
  @Query(() => Number, { name: 'roleTotal' })
  async total(): Promise<number> {
    return await this.managerRoleService.total();
  }

  /**
   * The `find` method handles the operation of retrieving manager roles with the provided pagination.
   *
   * @param {PaginationArgsDto} paginationArgsDto - The input object containing the pagination arguments.
   * @returns {Promise<PaginateInterface<ManagerRole>>} A promise that resolves to a paginated list of manager roles.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `find` method of the `managerRoleService` with the `paginationArgsDto`.
   * 2. It returns the result of the `find` method.
   *
   * @example
   * const paginationArgsDto = { page: 1, limit: 10 };
   * const paginatedManagerRoles = await managerRoleResolver.find(paginationArgsDto);
   */
  @Query(() => PaginatedAuthor, { name: 'roleList' })
  async find(
    @Args() paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<ManagerRole>> {
    return await this.managerRoleService.find(paginationArgsDto);
  }

  /**
   * The `getById` method handles the operation of retrieving a manager role by its ID.
   *
   * @param {string} id - The ID of the manager role to retrieve.
   * @returns {Promise<ManagerRole>} A promise that resolves to the manager role.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `getById` method of the `managerRoleService` with the `id`.
   * 2. It returns the result of the `getById` method.
   *
   * @example
   * const id = '123';
   * const managerRole = await managerRoleResolver.getById(id);
   */
  @Query(() => ManagerRole, { name: 'roleId' })
  async getById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ManagerRole> {
    return await this.managerRoleService.getById(id);
  }

  /**
   * The `getOne` method handles the operation of retrieving a single manager role that matches the provided filter.
   *
   * @param {FilterRoleInput} filter - The input object containing the filter criteria.
   * @returns {Promise<ManagerRole>} A promise that resolves to the manager role.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `getOne` method of the `managerRoleService` with the `filter`.
   * 2. It returns the result of the `getOne` method.
   *
   * @example
   * const filter = { name: 'test' };
   * const managerRole = await managerRoleResolver.getOne(filter);
   */
  @Mutation(() => ManagerRole, { name: 'roleFindOne' })
  async getOne(@Args('filter') filter: FilterRoleInput): Promise<ManagerRole> {
    return await this.managerRoleService.getOne(filter);
  }

  /**
   * The `update` method handles the operation of updating a manager role.
   *
   * @param {UpdateManagerRoleInput} updateRoleInput - The input object containing the data of the manager role to update.
   * @returns {Promise<ManagerRole>} A promise that resolves to the updated manager role.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `update` method of the `managerRoleService` with the `updateRoleInput`.
   * 2. It returns the result of the `update` method.
   *
   * @example
   * const updateRoleInput = { id: '123', name: 'test updated', description: 'test description updated' };
   * const updatedManagerRole = await managerRoleResolver.update(updateRoleInput);
   */
  @Mutation(() => ManagerRole, { name: 'roleUpdate' })
  async update(
    @Args('updateRoleInput')
    updateRoleInput: UpdateManagerRoleInput,
  ): Promise<ManagerRole> {
    return this.managerRoleService.update(updateRoleInput);
  }

  /**
   * The `delete` method handles the operation of deleting a manager role by its ID.
   *
   * @param {string} id - The ID of the manager role to delete.
   * @returns {Promise<ManagerRole>} A promise that resolves to the deleted manager role.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `delete` method of the `managerRoleService` with the `id`.
   * 2. It returns the result of the `delete` method.
   *
   * @example
   * const id = '123';
   * const deletedManagerRole = await managerRoleResolver.delete(id);
   */
  @Mutation(() => ManagerRole, { name: 'roleRemove' })
  async delete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ManagerRole> {
    return this.managerRoleService.delete(id);
  }
}
