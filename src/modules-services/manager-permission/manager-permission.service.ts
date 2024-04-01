import { Injectable } from '@nestjs/common';
import { CreateManagerPermissionInput } from './dto/create-manager-permission.input';
import { UpdateManagerPermissionInput } from './dto/update-manager-permission.input';
import { ManagerPermission } from './entities/manager-permission.entity';
import { PaginateInterface } from '../../common/interfaces/paginated.interface';
import { AbstractMethodOperation } from '../../common/util/class/abstract-method-operation.class';
import { RabbitMqEnum } from '../../common/enum/msg/rabbit-mq.enum';
import { ProxyRabbitMQ } from '../../common/util/class/proxy-rabbit-mq.class';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { PermissionsMsgEnum } from '../../common/enum/msg/manager-permissions.enum';

/**
 * The `PermissionsService` class provides methods for managing permissions in the application.
 *
 * This class implements the `AbstractMethodOperation<Permission>` interface, which means
 * It provides methods for creating, retrieving, updating, and deleting `Permission` entities.
 *
 * The class uses the `ProxyRabbitMQ` utility class to communicate with a RabbitMQ server.
 * The `ProxyRabbitMQ` instance is created in the constructor of the class and is used in
 * All methods that need to communicate with the RabbitMQ server.
 *
 * The class provides the following methods:
 * - `find`: Retrieves a paginated list of permissions.
 * - `getById`: Retrieves a permission by ID.
 * - `getOne`: Retrieves a permission that matches the specified filter.
 * - `create`: Creates a new permission.
 * - `update`: Updates a permission.
 * - `delete`: Deletes a permission.
 * - `total`: Retrieves the total number of permissions.
 *
 * Each method returns a `Promise` that resolves to the result of the operation. If an error
 * Occurs during the operation, the `Promise` is rejected with an `Error`.
 *
 * The `@Injectable()` decorator is used to mark the class as a provider that can be managed
 * By the NestJS dependency injection container.
 */
@Injectable()
export class ManagerPermissionService
  implements AbstractMethodOperation<ManagerPermission>
{
  /**
   * The `proxyRabbitMQ` property is an instance of the `ProxyRabbitMQ` utility class.
   * This property is used to communicate with a RabbitMQ server.
   * The `ProxyRabbitMQ` instance is created with the `RabbitMqEnum.permissionsQueue` parameter, which
   * Specifies the name of the RabbitMQ queue to use.
   */
  proxyRabbitMQ = new ProxyRabbitMQ(RabbitMqEnum.permissionsQueue);

  constructor() {}
  /**
   * The `find` method retrieves a paginated list of manager permissions.
   *
   * @param {PaginationArgsDto} paginationArgsDto - The DTO containing the pagination arguments.
   * @returns {Promise<PaginateInterface<ManagerPermission>>} A promise that resolves to a paginated list of manager permissions.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `FIND` message and the `paginationArgsDto`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const paginationArgsDto = { /* fill with actual data * / };
   * const permissions = await managerPermissionService.find(paginationArgsDto);
   */
  public async find(
    paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<ManagerPermission>> {
    return await this.proxyRabbitMQ.operations(
      PermissionsMsgEnum.FIND,
      paginationArgsDto,
    );
  }

  /**
   * The `getById` method retrieves a manager permission by its ID.
   *
   * @param {string | number} id - The ID of the manager permission to retrieve.
   * @returns {Promise<ManagerPermission>} A promise that resolves to the retrieved manager permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `FIND_BY_ID` message and the `id`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const id = '123';
   * const permission = await managerPermissionService.getById(id);
   */
  public getById(id: string | number): Promise<ManagerPermission> {
    return this.proxyRabbitMQ.operations(PermissionsMsgEnum.FIND_BY_ID, { id });
  }

  /**
   * The `getOne` method retrieves a single manager permission that matches the provided filter.
   *
   * @param {object} filter - The filter to apply.
   * @returns {Promise<ManagerPermission>} A promise that resolves to the retrieved manager permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `FIND_ONE` message and the `filter`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const filter = { /* fill with actual data * / };
   * const permission = await managerPermissionService.getOne(filter);
   */
  public getOne(filter: object): Promise<ManagerPermission> {
    return this.proxyRabbitMQ.operations(PermissionsMsgEnum.FIND_ONE, filter);
  }

  /**
   * The `create` method handles the operation of creating a new manager permission.
   *
   * @param {CreateManagerPermissionInput} item - The DTO containing the data of the manager permission to create.
   * @returns {Promise<ManagerPermission>} A promise that resolves to the created manager permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `CREATE` message and the `item`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const createManagerPermissionInput = { /* fill with actual data * / };
   * const newPermission = await managerPermissionService.create(createManagerPermissionInput);
   */
  public create(
    item: CreateManagerPermissionInput,
  ): Promise<ManagerPermission> {
    return this.proxyRabbitMQ.operations(PermissionsMsgEnum.CREATE, item);
  }

  /**
   * The `update` method handles the operation of updating a manager permission.
   *
   * @param {UpdateManagerPermissionInput} item - The DTO containing the new data of the manager permission.
   * @returns {Promise<ManagerPermission>} A promise that resolves to the updated manager permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `UPDATE` message and the `item`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const updateManagerPermissionInput = { /* fill with actual data * / };
   * const updatedPermission = await managerPermissionService.update(updateManagerPermissionInput);
   */
  public update(
    item: UpdateManagerPermissionInput,
  ): Promise<ManagerPermission> {
    return this.proxyRabbitMQ.operations(PermissionsMsgEnum.UPDATE, item);
  }

  /**
   * The `delete` method handles the operation of deleting a manager permission.
   *
   * @param {string} id - The ID of the manager permission to delete.
   * @returns {Promise<ManagerPermission>} A promise that resolves to the deleted manager permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `DELETE` message and the `id`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const id = '123';
   * const deletedPermission = await managerPermissionService.delete(id);
   */
  public delete(id: string): Promise<ManagerPermission> {
    return this.proxyRabbitMQ.operations(PermissionsMsgEnum.DELETE, { id });
  }

  /**
   * The `total` method handles the operation .
   *
   * @returns {Promise<number>} A promise that resolves to the total permission.
   *
   * @description
   * The function works as follows:
   * 1. It calls the `operations` method of the `proxyRabbitMQ` with the `TOTAL`.
   * 2. It returns the result of the `operations` method.
   *
   * @example
   * const totalPermission = await managerPermissionService.total();
   */
  public async total(): Promise<number> {
    return await this.proxyRabbitMQ.operations(PermissionsMsgEnum.TOTAL, {});
  }
}
