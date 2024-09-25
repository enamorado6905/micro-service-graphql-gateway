import { Injectable } from '@nestjs/common';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { Permission } from './entities/permission.entity';
import { PaginateInterface } from '../../common/interfaces/paginated.interface';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { PermissionServiceClass } from '../../common/util/class/service/permission.service.class';
import { FindOnePermissionInput } from './dto/find-one-permission.input';

/**
 * The `PermissionService` class provides methods for managing permission in the application.
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
export class PermissionService {
  constructor(
    private readonly permissionServiceClass: PermissionServiceClass,
  ) {}

  /**
   * The `find` method is an asynchronous method that retrieves a paginated list of permission.
   *
   * @param paginationArgsDto - An object that contains pagination parameters.
   * @returns A `Promise` that resolves to a paginated list of permission.
   */
  public async find(
    paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<Permission>> {
    return await this.permissionServiceClass.find(paginationArgsDto);
  }

  /**
   * The `getById` method retrieves a permission by ID.
   *
   * @param id - The ID of the permission to retrieve.
   * @returns A `Promise` that resolves to the permission with the specified ID.
   */
  public async getById(id: string): Promise<Permission> {
    return await this.permissionServiceClass.getById(id);
  }

  /**
   * The `getOne` method retrieves a permission that matches the specified filter.
   *
   * @param filter - An object that specifies the criteria for the permission to retrieve.
   * @returns A `Promise` that resolves to the permission that matches the filter.
   */
  public async getOne(filter: FindOnePermissionInput): Promise<Permission> {
    return await this.permissionServiceClass.getOne(filter);
  }

  /**
   * The `create` method creates a new permission.
   *
   * @param item - An object that contains the data for the permission to create.
   * @returns A `Promise` that resolves to the created permission.
   */
  public async create(item: CreatePermissionInput): Promise<Permission> {
    return await this.permissionServiceClass.create(item);
  }

  /**
   * The `update` method updates a permission.
   *
   * @param item - An object that contains the data for the permission to update.
   * @returns A `Promise` that resolves to the updated permission.
   */
  public async update(
    id: string | number,
    item: UpdatePermissionInput,
  ): Promise<Permission> {
    return await this.permissionServiceClass.update(id, item);
  }

  /**
   * The `delete` method deletes a permission.
   *
   * @param id - The ID of the permission to delete.
   * @returns A `Promise` that resolves to the deleted permission.
   */
  public async delete(id: string | number): Promise<Permission> {
    return await this.permissionServiceClass.delete(id);
  }

  /**
   * The `total` method retrieves the total number of permission.
   *
   * @returns A `Promise` that resolves to the total number of permission.
   */
  public async total(): Promise<number> {
    return await this.permissionServiceClass.total();
  }
}
