import { Injectable } from '@nestjs/common';
import { Permission } from '../../../modules-services/permission/entities/permission.entity';
import { CreatePermissionInput } from '../../../modules-services/permission/dto/create-permission.input';
import { UpdatePermissionInput } from '../../../modules-services/permission/dto/update-permission.input';
import { RabbitMqEnum } from '../../../common/enum/msg/rabbit-mq.enum';
import { PaginationArgsDto } from '../../../common/dto/args/pagination.args.dto';
import { PaginateInterface } from '../../../common/interfaces/pagination/paginated.interface';
import { PermissionsMsgEnum } from '../../../common/enum/msg/manager-permissions.enum';
import { AbstractMethodOperation } from '../../../common/class/abstract/abstract-method-operation.class';
import { OperationClass } from '../../../common/class/operation/operation.class';

/**
 * The `PermissionRepository` class provides methods for managing permission in the application.
 *
 * This class implements the `AbstractMethodOperation<Permission>` interface, which means
 * It provides methods for creating, retrieving, updating, and deleting `Permission` entities.
 *
 * The class uses the `ProxyRabbitMQ` utility class to communicate with a RabbitMQ server.
 * The `ProxyRabbitMQ` instance is created in the constructor of the class and is used in
 * All methods that need to communicate with the RabbitMQ server.
 *
 * The class provides the following methods:
 * - `find`: Retrieves a paginated list of permission.
 * - `getById`: Retrieves a permission by ID.
 * - `getOne`: Retrieves a permission that matches the specified filter.
 * - `create`: Creates a new permission.
 * - `update`: Updates a permission.
 * - `delete`: Deletes a permission.
 * - `total`: Retrieves the total number of permission.
 *
 * Each method returns a `Promise` that resolves to the result of the operation. If an error
 * Occurs during the operation, the `Promise` is rejected with an `Error`.
 *
 * The `@Injectable()` decorator is used to mark the class as a provider that can be managed
 * By the NestJS dependency injection container.
 */
@Injectable()
export class PermissionRepository
  implements AbstractMethodOperation<Permission>
{
  /**
   * The `operation` property is an instance of the `OperationClass` class, which is used to
   * perform operations on the RabbitMQ server.
   */
  private readonly operation = new OperationClass(
    RabbitMqEnum.accessControlQueue,
  );

  constructor() {}

  /**
   * The `find` method is an asynchronous method that retrieves a paginated list of permission.
   *
   * @param paginationArgsDto - An object that contains pagination parameters.
   * @returns A `Promise` that resolves to a paginated list of permission.
   */
  public async find(
    paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<Permission>> {
    return await this.operation.operations(
      PermissionsMsgEnum.FIND,
      paginationArgsDto,
    );
  }

  /**
   * The `getById` method retrieves a permission by ID.
   *
   * @param id - The ID of the permission to retrieve.
   * @returns A `Promise` that resolves to the permission with the specified ID.
   */
  public async getById(id: string | number): Promise<Permission> {
    return await this.operation.operations(PermissionsMsgEnum.FIND_BY_ID, {
      id,
    });
  }

  /**
   * The `getOne` method retrieves a permission that matches the specified filter.
   *
   * @param filter - An object that specifies the criteria for the permission to retrieve.
   * @returns A `Promise` that resolves to the permission that matches the filter.
   */
  public async getOne(filter: object): Promise<Permission> {
    return await this.operation.operations(PermissionsMsgEnum.FIND_ONE, filter);
  }

  /**
   * The `create` method creates a new permission.
   *
   * @param item - An object that contains the data for the permission to create.
   * @returns A `Promise` that resolves to the created permission.
   */
  public create(item: CreatePermissionInput): Promise<Permission> {
    return this.operation.operations(PermissionsMsgEnum.CREATE, item);
  }

  /**
   * The `update` method updates a permission.
   *
   * @param item - An object that contains the data for the permission to update.
   * @returns A `Promise` that resolves to the updated permission.
   */
  public update(
    id: string | number,
    item: UpdatePermissionInput,
  ): Promise<Permission> {
    return this.operation.operations(PermissionsMsgEnum.UPDATE, {
      id,
      item,
    });
  }

  /**
   * The `delete` method deletes a permission.
   *
   * @param id - The ID of the permission to delete.
   * @returns A `Promise` that resolves to the deleted permission.
   */
  public delete(id: string | number): Promise<Permission> {
    return this.operation.operations(PermissionsMsgEnum.DELETE, { id });
  }

  /**
   * The `total` method retrieves the total number of permission.
   *
   * @returns A `Promise` that resolves to the total number of permission.
   */
  public async total(): Promise<number> {
    return await this.operation.operations(PermissionsMsgEnum.TOTAL, {});
  }
}
