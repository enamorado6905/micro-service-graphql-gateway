import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PaginateInterface } from '../interfaces/pagination/paginated.interface';

/**
 * A higher-order function that creates a GraphQL object type for paginated responses.
 *
 * @typeparam T - The type of the items in the paginated list.
 * @param classRef - A class reference to the type T. This class should represent the structure of the items in the paginated list.
 * @returns A new GraphQL object type that implements PaginateInterface<T> with appropriate GraphQL fields.
 */
export function Paginated<T>(classRef: Type<T>): Type<PaginateInterface<T>> {
  // An abstract class that implements the PaginateInterface with GraphQL decorators for each field.
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements PaginateInterface<T> {
    @Field(() => Int, { nullable: true })
    limit: number; // The number of items per page.

    @Field(() => Int, { nullable: true })
    page: number; // The current page number.

    @Field(() => [classRef], { nullable: true })
    docs: T[];

    @Field(() => Int, { nullable: true })
    totalCount: number; // The total count of items in the entire list.

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

  // Returns the abstract class as a GraphQL object type.
  return PaginatedType as unknown as Type<PaginateInterface<T>>;
}
