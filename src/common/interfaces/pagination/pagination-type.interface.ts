import { IEdgeType } from './edge-type.interface';

/**
 * Interface for representing a paginated response in GraphQL or similar data fetching systems.
 * It includes a list of edges, nodes, the total count of items, and an indicator for additional
 * Pages.
 *
 * @typeparam T - The type of the items in the nodes array.
 */
export interface IPaginatedType<T> {
  /**
   * An array of edge objects, where each edge typically contains a node and a cursor.
   * Edges are used in GraphQL to represent connections between nodes, facilitating cursor-based
   * Pagination.
   */
  edges: IEdgeType<T>[];

  /**
   * An array of node items of type T. Nodes represent the actual data items in the paginated list.
   */
  nodes: T[];

  /**
   * The total count of items across all pages. This is useful for understanding the size of the
   * Entire dataset.
   */
  totalCount: number;

  /**
   * A boolean indicating whether there is a next page. This can be used to control UI elements like
   * 'Load More' buttons.
   */
  hasNextPage: boolean;
}
