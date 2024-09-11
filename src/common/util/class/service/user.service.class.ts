import { Injectable } from '@nestjs/common';
import { AbstractMethodOperation } from '../abstract-method-operation.class';
import { ProxyRabbitMQ } from '../proxy-rabbit-mq.class';
import { RabbitMqEnum } from '../../../enum/msg/rabbit-mq.enum';
import { PaginationArgsDto } from '../../../dto/args/pagination.args.dto';
import { PaginateInterface } from '../../../interfaces/paginated.interface';
import { UsersMsgEnum } from '../../../enum/msg/users.enum';
import { User } from '../../../../modules-services/users/entities/user.entity';
import { CreateUserInput } from '../../../../modules-services/users/dto/create-user.input';
import { UpdateUserInput } from '../../../../modules-services/users/dto/update-user.input';
import { LanguageClass } from '../language.class';

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
export class UsersServiceClass implements AbstractMethodOperation<User> {
  /**
   * The `proxyRabbitMQ` property is an instance of the `ProxyRabbitMQ` utility class.
   * This property is used to communicate with a RabbitMQ server.
   * The `ProxyRabbitMQ` instance is created with the `RabbitMqEnum.usersQueue` parameter, which
   * Specifies the name of the RabbitMQ queue to use.
   */
  private readonly proxyRabbitMQ = new ProxyRabbitMQ(RabbitMqEnum.usersQueue);

  constructor(private readonly language: LanguageClass) {}

  /**
   * The `find` method is an asynchronous method that retrieves a paginated list of users.
   *
   * @param paginationArgsDto - An object that contains pagination parameters.
   * @returns A `Promise` that resolves to a paginated list of users.
   */
  public async find(
    paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<User>> {
    return await this.proxyRabbitMQ.operations(
      UsersMsgEnum.FIND,
      paginationArgsDto,
    );
  }

  /**
   * The `getById` method retrieves a user by ID.
   *
   * @param id - The ID of the user to retrieve.
   * @returns A `Promise` that resolves to the user with the specified ID.
   */
  public async getById(id: string | number): Promise<User> {
    return await this.proxyRabbitMQ.operations(UsersMsgEnum.FIND_BY_ID, {
      id,
    });
  }

  /**
   * The `getOne` method retrieves a user that matches the specified filter.
   *
   * @param filter - An object that specifies the criteria for the user to retrieve.
   * @returns A `Promise` that resolves to the user that matches the filter.
   */
  public async getOne(filter: object): Promise<User> {
    return await this.proxyRabbitMQ.operations(UsersMsgEnum.FIND_ONE, filter);
  }

  /**
   * The `create` method creates a new user.
   *
   * @param item - An object that contains the data for the user to create.
   * @returns A `Promise` that resolves to the created user.
   */
  public create(item: CreateUserInput): Promise<User> {
    return this.proxyRabbitMQ.operations(UsersMsgEnum.CREATE, item);
  }

  /**
   * The `update` method updates a user.
   *
   * @param item - An object that contains the data for the user to update.
   * @returns A `Promise` that resolves to the updated user.
   */
  public update(id: string | number, item: UpdateUserInput): Promise<User> {
    return this.proxyRabbitMQ.operations(UsersMsgEnum.UPDATE, { id, item });
  }

  /**
   * The `delete` method deletes a user.
   *
   * @param id - The ID of the user to delete.
   * @returns A `Promise` that resolves to the deleted user.
   */
  public delete(id: string): Promise<User> {
    return this.proxyRabbitMQ.operations(UsersMsgEnum.DELETE, { id });
  }

  /**
   * The `total` method retrieves the total number of users.
   *
   * @returns A `Promise` that resolves to the total number of users.
   */
  public async total(): Promise<number> {
    try {
      return await this.proxyRabbitMQ.operations(UsersMsgEnum.TOTAL, {});
    } catch (error) {
      // Handle error if needed.
      throw error;
    }
  }
}
