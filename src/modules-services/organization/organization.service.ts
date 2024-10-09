import { Injectable } from '@nestjs/common';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { Organization } from './entities/organization.entity';
import { PaginateInterface } from '../../common/interfaces/pagination/paginated.interface';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { OrganizationRepository } from './repository/organization.repository.class';
import { FindOneOrganizationInput } from './dto/find-one-organization.input';

/**
 * The `OrganizationService` class provides methods for managing organization in the application.
 *
 * This class implements the `AbstractMethodOperation<Organization>` interface, which means
 * It provides methods for creating, retrieving, updating, and deleting `Organization` entities.
 *
 * The class uses the `ProxyRabbitMQ` utility class to communicate with a RabbitMQ server.
 * The `ProxyRabbitMQ` instance is created in the constructor of the class and is used in
 * All methods that need to communicate with the RabbitMQ server.
 *
 * The class provides the following methods:
 * - `find`: Retrieves a paginated list of organization.
 * - `getById`: Retrieves a organization by ID.
 * - `getOne`: Retrieves a organization that matches the specified filter.
 * - `create`: Creates a new organization.
 * - `update`: Updates a organization.
 * - `delete`: Deletes a organization.
 * - `total`: Retrieves the total number of organization.
 *
 * Each method returns a `Promise` that resolves to the result of the operation. If an error
 * Occurs during the operation, the `Promise` is rejected with an `Error`.
 *
 * The `@Injectable()` decorator is used to mark the class as a provider that can be managed
 * By the NestJS dependency injection container.
 */
@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  /**
   * The `find` method is an asynchronous method that retrieves a paginated list of organization.
   *
   * @param paginationArgsDto - An object that contains pagination parameters.
   * @returns A `Promise` that resolves to a paginated list of organization.
   */
  public async find(
    paginationArgsDto: PaginationArgsDto,
  ): Promise<PaginateInterface<Organization>> {
    return await this.organizationRepository.find(paginationArgsDto);
  }

  /**
   * The `getById` method retrieves a organization by ID.
   *
   * @param id - The ID of the organization to retrieve.
   * @returns A `Promise` that resolves to the organization with the specified ID.
   */
  public async getById(id: string | number): Promise<Organization> {
    return await this.organizationRepository.getById(id);
  }

  /**
   * The `getOne` method retrieves a organization that matches the specified filter.
   *
   * @param filter - An object that specifies the criteria for the organization to retrieve.
   * @returns A `Promise` that resolves to the organization that matches the filter.
   */
  public async getOne(filter: FindOneOrganizationInput): Promise<Organization> {
    return await this.organizationRepository.getOne(filter);
  }

  /**
   * The `create` method creates a new organization.
   *
   * @param item - An object that contains the data for the organization to create.
   * @returns A `Promise` that resolves to the created organization.
   */
  public async create(item: CreateOrganizationInput): Promise<Organization> {
    return await this.organizationRepository.create(item);
  }

  /**
   * The `update` method updates a organization.
   *
   * @param item - An object that contains the data for the organization to update.
   * @returns A `Promise` that resolves to the updated organization.
   */
  public async update(
    id: string | number,
    item: UpdateOrganizationInput,
  ): Promise<Organization> {
    return await this.organizationRepository.update(id, item);
  }

  /**
   * The `delete` method deletes a organization.
   *
   * @param id - The ID of the organization to delete.
   * @returns A `Promise` that resolves to the deleted organization.
   */
  public async delete(id: string): Promise<Organization> {
    return await this.organizationRepository.delete(id);
  }

  /**
   * The `total` method retrieves the total number of organization.
   *
   * @returns A `Promise` that resolves to the total number of organization.
   */
  public async total(): Promise<number> {
    return await this.organizationRepository.total();
  }
}
