/**
 * Generic interface for representing pagination data.
 * Can be used for any type of paginated list.
 *
 * @typeparam T - The type of elements in the paginated list.
 */
export interface PaginateInterface<T> {
  limit: number;
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  totalDocs: number;
  pagingCounter: number;
  meta?: object;
  docs: T[];
}
