import { Injectable } from '@nestjs/common';
import { AbstractMethodOperation } from '../../../common/class/abstract/abstract-method-operation.class';
import { ProxyRabbitMQ } from '../../../common/class/connection/proxy-rabbit-mq.class';
import { RabbitMqEnum } from '../../../common/enum/msg/rabbit-mq.enum';
import { PaginationArgsDto } from '../../../common/dto/args/pagination.args.dto';
import { PaginateInterface } from '../../../common/interfaces/pagination/paginated.interface';
import { OrganizationMsgEnum } from '../../../common/enum/msg/organization.enum';
import { Organization } from '../entities/organization.entity';
import { CreateOrganizationInput } from '../dto/create-organization.input';
import { UpdateOrganizationInput } from '../dto/update-organization.input';
import { LanguageClass } from '../../../common/class/operation/language.class';

/**
 * The `OrganizationRepository` class provides methods for managing Organization in the application.
 *
 * This class implements the `AbstractMethodOperation<Organization>` interface, which means
 * It provides methods for creating, retrieving, updating, and deleting `Organization` entities.
 *
 * The class uses the `ProxyRabbitMQ` utility class to communicate with a RabbitMQ server.
 * The `ProxyRabbitMQ` instance is created in the constructor of the class and is used in
 * All methods that need to communicate with the RabbitMQ server.
 *
 * The class provides the following methods:
 * - `find`: Retrieves a paginated list of Organization.
 * - `getById`: Retrieves a organization by ID.
 * - `getOne`: Retrieves a organization that matches the specified filter.
 * - `create`: Creates a new organization.
 * - `update`: Updates a organization.
 * - `delete`: Deletes a organization.
 * - `total`: Retrieves the total number of Organization.
 *
 * Each method returns a `Promise` that resolves to the result of the operation. If an error
 * Occurs during the operation, the `Promise` is rejected with an `Error`.
 *
 * The `@Injectable()` decorator is used to mark the class as a provider that can be managed
 * By the NestJS dependency injection container.
 */
@Injectable()
export class OrganizationRepository
  implements AbstractMethodOperation<Organization>
{
  /**
   * The `proxyRabbitMQ` property is an instance of the `ProxyRabbitMQ` utility class.
   * This property is used to communicate with a RabbitMQ server.
   * The `ProxyRabbitMQ` instance is created with the `RabbitMqEnum.OrganizationQueue` parameter, which
   * Specifies the name of the RabbitMQ queue to use.
   */
  private readonly proxyRabbitMQ = new ProxyRabbitMQ(
    RabbitMqEnum.organizationQueue,
  );

  constructor(private readonly language: LanguageClass) {}

  /**
   * The `find` method is an asynchronous method that retrieves a paginated list of Organization.
   *
   * @param paginationArgsDto - An object that contains pagination parameters.
   * @returns A `Promise` that resolves to a paginated list of Organization.
   */
  public async find(
    paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<Organization>> {
    return await this.proxyRabbitMQ.operations(
      OrganizationMsgEnum.FIND,
      paginationArgsDto,
    );
  }

  /**
   * The `getById` method retrieves a organization by ID.
   *
   * @param id - The ID of the organization to retrieve.
   * @returns A `Promise` that resolves to the organization with the specified ID.
   */
  public async getById(id: string | number): Promise<Organization> {
    return await this.proxyRabbitMQ.operations(OrganizationMsgEnum.FIND_BY_ID, {
      id,
    });
  }

  /**
   * The `getOne` method retrieves a organization that matches the specified filter.
   *
   * @param filter - An object that specifies the criteria for the organization to retrieve.
   * @returns A `Promise` that resolves to the organization that matches the filter.
   */
  public async getOne(filter: object): Promise<Organization> {
    return await this.proxyRabbitMQ.operations(
      OrganizationMsgEnum.FIND_ONE,
      filter,
    );
  }

  /**
   * The `create` method creates a new organization.
   *
   * @param item - An object that contains the data for the organization to create.
   * @returns A `Promise` that resolves to the created organization.
   */
  public create(item: CreateOrganizationInput): Promise<Organization> {
    return this.proxyRabbitMQ.operations(OrganizationMsgEnum.CREATE, item);
  }

  /**
   * The `update` method updates a organization.
   *
   * @param item - An object that contains the data for the organization to update.
   * @returns A `Promise` that resolves to the updated organization.
   */
  public update(
    id: string | number,
    item: UpdateOrganizationInput,
  ): Promise<Organization> {
    return this.proxyRabbitMQ.operations(OrganizationMsgEnum.UPDATE, {
      id,
      item,
    });
  }

  /**
   * The `delete` method deletes a organization.
   *
   * @param id - The ID of the organization to delete.
   * @returns A `Promise` that resolves to the deleted organization.
   */
  public delete(id: string): Promise<Organization> {
    return this.proxyRabbitMQ.operations(OrganizationMsgEnum.DELETE, { id });
  }

  /**
   * The `total` method retrieves the total number of Organization.
   *
   * @returns A `Promise` that resolves to the total number of Organization.
   */
  public async total(): Promise<number> {
    return await this.proxyRabbitMQ.operations(OrganizationMsgEnum.TOTAL, {});
  }
}
