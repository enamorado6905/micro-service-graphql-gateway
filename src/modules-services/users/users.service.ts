import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { PaginateInterface } from '../../common/interfaces/paginated.interface';
import { AbstractMethodOperation } from '../../common/util/class/abstract-method-operation.class';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { UsersServiceClass } from '../../common/util/class/service/user.service.class';
import { FindOneUserInput } from './dto/find-one-user.input';

/**
 * The `UsersService` class provides methods for managing users in the application.
 *
 * This class implements the `AbstractMethodOperation<User>` interface, which means
 * It provides methods for creating, retrieving, updating, and deleting `User` entities.
 *
 * The class uses the `ProxyRabbitMQ` utility class to communicate with a RabbitMQ server.
 * The `ProxyRabbitMQ` instance is created in the constructor of the class and is used in
 * All methods that need to communicate with the RabbitMQ server.
 *
 * The class provides the following methods:
 * - `find`: Retrieves a paginated list of users.
 * - `getById`: Retrieves a user by ID.
 * - `getOne`: Retrieves a user that matches the specified filter.
 * - `create`: Creates a new user.
 * - `update`: Updates a user.
 * - `delete`: Deletes a user.
 * - `total`: Retrieves the total number of users.
 *
 * Each method returns a `Promise` that resolves to the result of the operation. If an error
 * Occurs during the operation, the `Promise` is rejected with an `Error`.
 *
 * The `@Injectable()` decorator is used to mark the class as a provider that can be managed
 * By the NestJS dependency injection container.
 */
@Injectable()
export class UsersService implements AbstractMethodOperation<User> {
  constructor(private readonly usersServiceClass: UsersServiceClass) {}

  /**
   * The `find` method is an asynchronous method that retrieves a paginated list of users.
   *
   * @param paginationArgsDto - An object that contains pagination parameters.
   * @returns A `Promise` that resolves to a paginated list of users.
   */
  public async find(
    paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<User>> {
    return await this.usersServiceClass.find(paginationArgsDto);
  }

  /**
   * The `getById` method retrieves a user by ID.
   *
   * @param id - The ID of the user to retrieve.
   * @returns A `Promise` that resolves to the user with the specified ID.
   */
  public async getById(id: string | number): Promise<User> {
    return await this.usersServiceClass.getById(id);
  }

  /**
   * The `getOne` method retrieves a user that matches the specified filter.
   *
   * @param filter - An object that specifies the criteria for the user to retrieve.
   * @returns A `Promise` that resolves to the user that matches the filter.
   */
  public async getOne(filter: FindOneUserInput): Promise<User> {
    return await this.usersServiceClass.getOne(filter);
  }

  /**
   * The `create` method creates a new user.
   *
   * @param item - An object that contains the data for the user to create.
   * @returns A `Promise` that resolves to the created user.
   */
  public async create(item: CreateUserInput): Promise<User> {
    return await this.usersServiceClass.create(item);
  }

  /**
   * The `update` method updates a user.
   *
   * @param item - An object that contains the data for the user to update.
   * @returns A `Promise` that resolves to the updated user.
   */
  public async update(
    id: string | number,
    item: UpdateUserInput,
  ): Promise<User> {
    return await this.usersServiceClass.update(id, item);
  }

  /**
   * The `delete` method deletes a user.
   *
   * @param id - The ID of the user to delete.
   * @returns A `Promise` that resolves to the deleted user.
   */
  public async delete(id: string): Promise<User> {
    return await this.usersServiceClass.delete(id);
  }

  /**
   * The `total` method retrieves the total number of users.
   *
   * @returns A `Promise` that resolves to the total number of users.
   */
  public async total(): Promise<number> {
    return await this.usersServiceClass.total();
  }
}
