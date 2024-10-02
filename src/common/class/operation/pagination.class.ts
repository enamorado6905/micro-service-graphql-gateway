import { Injectable } from '@nestjs/common';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PaginateInterface } from '../../interfaces/paginated.interface';
import { IPaginatedType } from '../../interfaces/pagination/pagination-type.interface';

@Injectable()
export class PaginationClass<T> {
  private readonly page: number;
  private readonly limit: number;
  private readonly nodes: Array<T>;
  private readonly totalDocument: number;

  constructor(page: number, limit: number, nodes: Array<T>, total: number) {
    this.page = page;
    this.nodes = nodes;
    this.limit = limit;
    this.totalDocument = total;
  }

  /**
   * This function created object type pagination
   */
  public paginated(): PaginateInterface<T> {
    const totalPages = Math.ceil(this.totalDocument / this.limit);
    const hasNextPage = this.page < totalPages;

    const nextPage = hasNextPage ? this.page + 1 : null;
    const prevPage = this.page > 1 ? this.page - 1 : null;
    const hasPrevPage = this.page > 1;
    const pagingCounter = (this.page - 1) * this.limit + 1;

    return {
      docs: this.nodes,
      page: this.page,
      limit: this.limit,
      totalDocs: this.totalDocument,
      totalPages,
      hasNextPage,
      nextPage,
      prevPage,
      hasPrevPage,
      pagingCounter,
    };
  }

  /**
   * A higher-order function that creates an abstract GraphQL object type for paginated responses.
   * This function follows the Relay specification for GraphQL pagination, including edges and nodes.
   *
   * @typeparam T - The type of the items in the paginated list.
   * @param classRef - A class reference to the type T. This class should represent the structure of the items in the paginated list.
   * @returns A new GraphQL object type that implements IPaginatedType<T> with appropriate GraphQL fields for pagination.
   */
  public static Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    /**
     * Abstract class implementing the IPaginatedType interface for paginated responses.
     * Includes edges, nodes, total count, and a flag for the next page.
     */
    @ObjectType({ isAbstract: true })
    abstract class PaginatedType implements IPaginatedType<T> {
      @Field(() => [classRef], { nullable: true })
      nodes: T[]; // The list of nodes in the paginated response.

      @Field(() => Int, { nullable: true })
      limit: number = 10; // The number of items per page.

      @Field(() => Int, { nullable: true })
      page: number = 0; // The current page number.

      @Field(() => Int, { nullable: true })
      totalCount: number = 0; // The total count of items in the entire list.

      @Field(() => Boolean, { nullable: true })
      hasNextPage: boolean; // A boolean flag indicating if there is a next page.

      @Field(() => Boolean, { nullable: true })
      hasPrevPage: boolean; // A boolean flag indicating if there is a previous page.

      @Field(() => Int, { nullable: true })
      totalPages: number; // The total number of pages.

      @Field(() => Int, { nullable: true })
      nextPage: number | null; // The next page number.

      @Field(() => Int, { nullable: true })
      prevPage: number | null; // The previous page number.

      @Field(() => Int, { nullable: true })
      pagingCounter: number; // The current page number.

      @Field(() => Int, { nullable: true })
      totalDocs: number; // The total number of items across all pages.

      meta?: object;
    }

    // Returns the PaginatedType as a GraphQL object type.
    return PaginatedType as Type<IPaginatedType<T>>;
  }
}
