/**
 * Generic interface for representing pagination data.
 * Can be used for any type of paginated list.
 *
 * @typeparam T - The type of elements in the paginated list.
 */
export interface PaginateInterface<T> {
  /**
   * The total number of items across all pages. This is an optional field.
   */
  total?: number;

  /**
   * The number of items per page. This is an optional field and can be used
   * to indicate how many items are displayed on one page.
   */
  per_page?: number;

  /**
   * The current page number. This is an optional field and helps in identifying
   * the current page in the context of pagination.
   */
  page?: number;

  /**
   * An array of items of type T. This represents the actual data items on the
   * current page.
   */
  nodes: T[];
}
