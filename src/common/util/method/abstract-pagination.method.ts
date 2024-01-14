import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { IPaginatedType } from '../../interfaces/pagination/pagination-type.interface';

/**
 * A higher-order function that creates an abstract GraphQL object type for paginated responses.
 * This function follows the Relay specification for GraphQL pagination, including edges and nodes.
 *
 * @typeparam T - The type of the items in the paginated list.
 * @param classRef - A class reference to the type T. This class should represent the structure of the items in the paginated list.
 * @returns A new GraphQL object type that implements IPaginatedType<T> with appropriate GraphQL fields for pagination.
 */
export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  /**
   * Inner abstract class representing an edge in GraphQL pagination.
   * An edge typically includes a cursor and a node.
   */
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string; // The cursor representing this edge's position in the list.

    @Field(() => classRef)
    node: T; // The actual data node of type T.
  }

  /**
   * Abstract class implementing the IPaginatedType interface for paginated responses.
   * Includes edges, nodes, total count, and a flag for the next page.
   */
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[]; // An array of EdgeType objects, each containing a node of type T and a cursor.

    @Field(() => [classRef], { nullable: true })
    nodes: T[]; // An array of data nodes of type T.

    @Field(() => Int)
    totalCount: number; // The total count of items in the entire list.

    @Field()
    hasNextPage: boolean; // A boolean flag indicating if there is a next page.
  }

  // Returns the PaginatedType as a GraphQL object type.
  return PaginatedType as Type<IPaginatedType<T>>;
}
