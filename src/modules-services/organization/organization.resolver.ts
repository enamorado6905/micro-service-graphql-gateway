import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { FindOneOrganizationInput } from './dto/find-one-organization.input';
import {
  PaginatedOrganization,
  Organization,
} from './entities/organization.entity';
import { PaginationArgsDto } from '../../common/dto/args/pagination.args.dto';
import { UseInterceptors } from '@nestjs/common';
import { PasswordEncryptionInterceptor } from '../../common/intercertors/password-encryption.interceptor';
import { RemovePasswordInterceptor } from '../../common/intercertors/remove-password.interceptor';
import { OrganizationResolverEnum } from '../../common/enum/system/name-resolver/organization-resolver.enum';
import { FilterByIdOrganizationInput } from './dto/filter-by-id.input';

/**
 * The `OrganizationResolver` class provides GraphQL resolvers for managing organizations in the application.
 *
 * This class implements the `AbstractMethodOperation<Organization>` interface, which means it provides
 * Methods for creating, retrieving, updating, and deleting `Organization` entities.
 *
 * The class uses the `OrganizationService` to perform operations on `Organization` entities. The `OrganizationService`
 * Instance is injected into the class through the constructor.
 *
 * The `@Resolver(() => Organization)` decorator is used to mark the class as a GraphQL resolver for the
 * `Organization` type.
 */
@Resolver(() => Organization)
export class OrganizationResolver {
  /**
   * The constructor of the `OrganizationResolver` class.
   *
   * The constructor injects an instance of the `OrganizationService` into the class. This service is used
   * Yo perform operations on `Organization` entities.
   *
   * @param organizationsService - The `OrganizationService` to inject into the class.
   */
  constructor(private readonly organizationsService: OrganizationService) {}

  /**
   * Mutation to create a new organization.
   * @param createOrganizationInput - The input data for creating a organization.
   * @returns The created organization.
   */
  @Mutation(() => Organization, {
    name: OrganizationResolverEnum.ORGANIZATION_REGISTER,
  })
  @UseInterceptors(PasswordEncryptionInterceptor)
  async create(
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<Organization> {
    return await this.organizationsService.create(createOrganizationInput);
  }

  /**
   * Query to get the total number of organizations.
   * @returns The total number of organizations.
   */
  @Query(() => Number, { name: OrganizationResolverEnum.ORGANIZATION_TOTAL })
  async total(): Promise<number> {
    return await this.organizationsService.total();
  }

  /**
   * Query to find all organizations with pagination.
   * @param paginationArgsDto - The pagination arguments.
   * @returns The paginated list of organizations.
   */
  @Query(() => PaginatedOrganization, {
    name: OrganizationResolverEnum.ORGANIZATION_LIST,
  })
  @UseInterceptors(RemovePasswordInterceptor)
  async find(@Args() paginationArgsDto: PaginationArgsDto) {
    return await this.organizationsService.find(paginationArgsDto);
  }

  /**
   * Query to find a organization by ID.
   * @param id - The ID of the organization.
   * @returns The found organization.
   */
  @Query(() => Organization, { name: OrganizationResolverEnum.ORGANIZATION_ID })
  async getById(
    @Args('id') id: FilterByIdOrganizationInput,
  ): Promise<Organization> {
    return await this.organizationsService.getById(id.id);
  }

  /**
   * Mutation to find a organization by filter.
   * @param filter - The filter criteria.
   * @returns The found organization.
   */
  @Query(() => Organization, {
    name: OrganizationResolverEnum.ORGANIZATION_FIND_ONE,
  })
  async getOne(
    @Args('filter') filter: FindOneOrganizationInput,
  ): Promise<Organization> {
    return await this.organizationsService.getOne(filter);
  }

  /**
   * Mutation to update a organization.
   * @param updateOrganizationInput - The input data for updating a organization.
   * @returns The updated organization.
   */
  @Mutation(() => Organization, {
    name: OrganizationResolverEnum.ORGANIZATION_UPDATE,
  })
  @UseInterceptors(RemovePasswordInterceptor)
  async update(
    @Args('id') id: FilterByIdOrganizationInput,
    @Args('updateOrganizationInput')
    updateOrganizationInput: UpdateOrganizationInput,
  ): Promise<Organization> {
    return this.organizationsService.update(id.id, updateOrganizationInput);
  }

  /**
   * Mutation to remove a organization by ID.
   * @param id - The ID of the organization to remove.
   * @returns The removed organization.
   */
  @Mutation(() => Organization, {
    name: OrganizationResolverEnum.ORGANIZATION_REMOVE,
  })
  @UseInterceptors(RemovePasswordInterceptor)
  async delete(
    @Args('id') id: FilterByIdOrganizationInput,
  ): Promise<Organization> {
    return this.organizationsService.delete(id.id);
  }
}
