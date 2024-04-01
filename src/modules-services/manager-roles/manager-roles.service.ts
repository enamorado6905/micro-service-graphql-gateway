import { Injectable } from '@nestjs/common';
import { CreateManagerRoleInput } from './dto/create-manager-role.input';
import { UpdateManagerRoleInput } from './dto/update-manager-role.input';
import { ManagerRole } from './entities/manager-role.entity';
import { PaginateInterface } from '../../common/interfaces/paginated.interface';
import { AbstractMethodOperation } from '../../common/util/class/abstract-method-operation.class';
import { RabbitMqEnum } from '../../common/enum/msg/rabbit-mq.enum';
import { ProxyRabbitMQ } from '../../common/util/class/proxy-rabbit-mq.class';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { RolesMsgEnum } from '../../common/enum/msg/manager-roles.enum';

/**
 * The `RolesService` class provides methods for managing roles in the application.
 *
 * This class implements the `AbstractMethodOperation<Role>` interface, which means
 * It provides methods for creating, retrieving, updating, and deleting `Role` entities.
 *
 * The class uses the `ProxyRabbitMQ` utility class to communicate with a RabbitMQ server.
 * The `ProxyRabbitMQ` instance is created in the constructor of the class and is used in
 * All methods that need to communicate with the RabbitMQ server.
 *
 * The class provides the following methods:
 * - `find`: Retrieves a paginated list of roles.
 * - `getById`: Retrieves a role by ID.
 * - `getOne`: Retrieves a role that matches the specified filter.
 * - `create`: Creates a new role.
 * - `update`: Updates a role.
 * - `delete`: Deletes a role.
 * - `total`: Retrieves the total number of roles.
 *
 * Each method returns a `Promise` that resolves to the result of the operation. If an error
 * Occurs during the operation, the `Promise` is rejected with an `Error`.
 *
 * The `@Injectable()` decorator is used to mark the class as a provider that can be managed
 * By the NestJS dependency injection container.
 */
@Injectable()
export class ManagerRolesService
  implements AbstractMethodOperation<ManagerRole>
{
  /**
   * The `proxyRabbitMQ` property is an instance of the `ProxyRabbitMQ` utility class.
   * This property is used to communicate with a RabbitMQ server.
   * The `ProxyRabbitMQ` instance is created with the `RabbitMqEnum.rolesQueue` parameter, which
   * Specifies the name of the RabbitMQ queue to use.
   */
  proxyRabbitMQ = new ProxyRabbitMQ(RabbitMqEnum.permissionsQueue);

  constructor() {}
  /**
   * The `find` method retrieves a paginated list of manager roles.
   *
   * @param {PaginationArgsDto} paginationArgsDto - The DTO containing the pagination arguments.
   * @returns {Promise<PaginateInterface<ManagerRole>>} A promise that resolves to a paginated list of manager roles.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `FIND` message and the `paginationArgsDto`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const paginationArgsDto = { /* fill with actual data * / };
   * const roles = await managerRolesService.find(paginationArgsDto);
   */
  public async find(
    paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<ManagerRole>> {
    return await this.proxyRabbitMQ.operations(
      RolesMsgEnum.FIND,
      paginationArgsDto,
    );
  }

  /**
   * The `getById` method retrieves a manager role by its ID.
   *
   * @param {string | number} id - The ID of the manager role to retrieve.
   * @returns {Promise<ManagerRole>} A promise that resolves to the retrieved manager role.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `FIND_BY_ID` message and the `id`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const id = '123';
   * const role = await managerRolesService.getById(id);
   */
  public getById(id: string | number): Promise<ManagerRole> {
    return this.proxyRabbitMQ.operations(RolesMsgEnum.FIND_BY_ID, { id });
  }

  /**
   * The `getOne` method retrieves a single manager role that matches the provided filter.
   *
   * @param {object} filter - The filter to apply.
   * @returns {Promise<ManagerRole>} A promise that resolves to the retrieved manager role.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `FIND_ONE` message and the `filter`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const filter = { /* fill with actual data * / };
   * const role = await managerRolesService.getOne(filter);
   */
  public getOne(filter: object): Promise<ManagerRole> {
    return this.proxyRabbitMQ.operations(RolesMsgEnum.FIND_ONE, filter);
  }

  /**
   * The `create` method handles the operation of creating a new manager role.
   *
   * @param {CreateManagerRoleInput} item - The DTO containing the data of the manager role to create.
   * @returns {Promise<ManagerRole>} A promise that resolves to the created manager role.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `CREATE` message and the `item`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const createManagerRoleInput = { /* fill with actual data * / };
   * const newRole = await managerRolesService.create(createManagerRoleInput);
   */
  public create(item: CreateManagerRoleInput): Promise<ManagerRole> {
    return this.proxyRabbitMQ.operations(RolesMsgEnum.CREATE, item);
  }

  /**
   * The `update` method handles the operation of updating a manager role.
   *
   * @param {UpdateManagerRoleInput} item - The DTO containing the updated data of the manager role.
   * @returns {Promise<ManagerRole>} A promise that resolves to the updated manager role.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `UPDATE` message and the `item`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const updateManagerRoleInput = { /* fill with actual data * / };
   * const updatedRole = await managerRolesService.update(updateManagerRoleInput);
   */
  public update(item: UpdateManagerRoleInput): Promise<ManagerRole> {
    return this.proxyRabbitMQ.operations(RolesMsgEnum.UPDATE, item);
  }

  /**
   * The `delete` method handles the operation of deleting a manager role.
   *
   * @param {string} id - The ID of the manager role to delete.
   * @returns {Promise<ManagerRole>} A promise that resolves to the deleted manager role.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `DELETE` message and the `id`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const id = '123';
   * const deletedRole = await managerRolesService.delete(id);
   */
  public delete(id: string): Promise<ManagerRole> {
    return this.proxyRabbitMQ.operations(RolesMsgEnum.DELETE, { id });
  }

  /**
   * The `total` method retrieves the total number of manager roles.
   *
   * @returns {Promise<number>} A promise that resolves to the total number of manager roles.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `TOTAL` message.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const totalRoles = await managerRolesService.total();
   */
  public async total(): Promise<number> {
    return await this.proxyRabbitMQ.operations(RolesMsgEnum.TOTAL, {});
  }
}
