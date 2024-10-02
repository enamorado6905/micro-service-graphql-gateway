export interface IPaginatedType<T> {
  /**
   * An array of node items of type T. Nodes represent the actual data items in the paginated list.
   */
  readonly nodes: T[];

  /**
   * The total count of items across all pages. This is useful for understanding the size of the
   * Entire dataset.
   */
  readonly totalCount: number;

  /**
   * A boolean indicating whether there is a next page. This can be used to control UI elements like
   * 'Load More' buttons.
   */
  readonly hasNextPage: boolean;

  /**
   * The number of items per page.
   */
  readonly limit: number;

  /**
   * The current page number.
   */
  readonly page: number;

  /**
   * A boolean indicating whether there is a previous page.
   */
  readonly hasPrevPage: boolean;

  /**
   * The total number of pages.
   */
  readonly totalPages: number;

  /**
   * The next page number.
   */
  readonly nextPage: number | null;

  /**
   * The previous page number.
   */
  readonly prevPage: number | null;

  /**
   * The current page number.
   */
  readonly pagingCounter: number;

  /**
   * The total number of items across all pages.
   */
  readonly totalDocs: number;

  /**
   * Additional metadata.
   */
  readonly meta?: object;
}
