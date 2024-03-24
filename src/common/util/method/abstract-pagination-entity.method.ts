import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PaginateInterface } from '../../interfaces/paginated.interface';

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
    total?: number; // The total number of items across all pages.

    @Field(() => Int, { nullable: true })
    limit?: number; // The number of items per page.

    @Field(() => Int, { nullable: true })
    page?: number; // The current page number.

    @Field(() => [classRef], { nullable: true })
    nodes: T[]; // The list of items of type T on the current page.
  }

  // Returns the abstract class as a GraphQL object type.
  return PaginatedType as Type<PaginateInterface<T>>;
}
