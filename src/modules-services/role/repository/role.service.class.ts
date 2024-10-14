import { Injectable } from '@nestjs/common';
import { Role } from '../../../modules-services/role/entities/role.entity';
import { CreateRoleInput } from '../../../modules-services/role/dto/create-role.input';
import { UpdateRoleInput } from '../../../modules-services/role/dto/update-role.input';
import { AbstractMethodOperation } from '../../../common/class/abstract/abstract-method-operation.class';
import { PaginationArgsDto } from '../../../common/dto/args/pagination.args.dto';
import { PaginateInterface } from '../../../common/interfaces/pagination/paginated.interface';
import { RolesMsgEnum } from '../../../common/enum/msg/manager-roles.enum';
import { RabbitMqEnum } from '../../../common/enum/msg/rabbit-mq.enum';
import { OperationClass } from '../../../common/class/operation/operation.class';

/**
 * The `RoleRepository` class provides methods for managing role in the application.
 *
 * This class implements the `AbstractMethodOperation<Role>` interface, which means
 * It provides methods for creating, retrieving, updating, and deleting `Role` entities.
 *
 * The class uses the `ProxyRabbitMQ` utility class to communicate with a RabbitMQ server.
 * The `ProxyRabbitMQ` instance is created in the constructor of the class and is used in
 * All methods that need to communicate with the RabbitMQ server.
 *
 * The class provides the following methods:
 * - `find`: Retrieves a paginated list of role.
 * - `getById`: Retrieves a role by ID.
 * - `getOne`: Retrieves a role that matches the specified filter.
 * - `create`: Creates a new role.
 * - `update`: Updates a role.
 * - `delete`: Deletes a role.
 * - `total`: Retrieves the total number of role.
 *
 * Each method returns a `Promise` that resolves to the result of the operation. If an error
 * Occurs during the operation, the `Promise` is rejected with an `Error`.
 *
 * The `@Injectable()` decorator is used to mark the class as a provider that can be managed
 * By the NestJS dependency injection container.
 */
@Injectable()
export class RoleRepository implements AbstractMethodOperation<Role> {
  /**
   * The `operation` property is an instance of the `OperationClass` class, which is used to
   * perform operations on the RabbitMQ server.
   */
  private readonly operation = new OperationClass(
    RabbitMqEnum.accessControlQueue,
  );

  constructor() {}

  /**
   * The `find` method is an asynchronous method that retrieves a paginated list of role.
   *
   * @param paginationArgsDto - An object that contains pagination parameters.
   * @returns A `Promise` that resolves to a paginated list of role.
   */
  public async find(
    paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<Role>> {
    return await this.operation.operations(
      RolesMsgEnum.FIND,
      paginationArgsDto,
    );
  }

  /**
   * The `getById` method retrieves a role by ID.
   *
   * @param id - The ID of the role to retrieve.
   * @returns A `Promise` that resolves to the role with the specified ID.
   */
  public async getById(id: string): Promise<Role> {
    return await this.operation.operations(RolesMsgEnum.FIND_BY_ID, {
      id,
    });
  }

  /**
   * The `getOne` method retrieves a role that matches the specified filter.
   *
   * @param filter - An object that specifies the criteria for the role to retrieve.
   * @returns A `Promise` that resolves to the role that matches the filter.
   */
  public async getOne(filter: object): Promise<Role> {
    return await this.operation.operations(RolesMsgEnum.FIND_ONE, filter);
  }

  /**
   * The `create` method creates a new role.
   *
   * @param item - An object that contains the data for the role to create.
   * @returns A `Promise` that resolves to the created role.
   */
  public create(item: CreateRoleInput): Promise<Role> {
    return this.operation.operations(RolesMsgEnum.CREATE, item);
  }

  /**
   * The `update` method updates a role.
   *
   * @param item - An object that contains the data for the role to update.
   * @returns A `Promise` that resolves to the updated role.
   */
  public update(id: string | number, item: UpdateRoleInput): Promise<Role> {
    return this.operation.operations(RolesMsgEnum.UPDATE, { id, item });
  }

  /**
   * The `delete` method deletes a role.
   *
   * @param id - The ID of the role to delete.
   * @returns A `Promise` that resolves to the deleted role.
   */
  public delete(id: string | number): Promise<Role> {
    return this.operation.operations(RolesMsgEnum.DELETE, { id });
  }

  /**
   * The `total` method retrieves the total number of role.
   *
   * @returns A `Promise` that resolves to the total number of role.
   */
  public async total(): Promise<number> {
    return await this.operation.operations(RolesMsgEnum.TOTAL, {});
  }
}
