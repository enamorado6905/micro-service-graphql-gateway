import { Injectable } from '@nestjs/common';
import { PaginateInterface } from '../../interfaces/paginated.interface';

@Injectable()
export class PaginationClass<T> {
  private readonly page: number;
  private readonly limit: number;
  private readonly nodes: Array<any>;
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
    const skip = (this.page - 1) * this.limit;
    const totalPages = Math.ceil(this.totalDocument / this.limit);
    const docs = this.nodes;

    const nextPage = this.page < totalPages ? this.page + 1 : null;
    const prevPage = this.page > 1 ? this.page - 1 : null;
    const hasNextPage = nextPage !== null;
    const hasPrevPage = prevPage !== null;

    return {
      totalDocs: this.totalDocument,
      docs,
      limit: this.limit,
      page: this.page,
      nextPage,
      prevPage,
      hasNextPage,
      hasPrevPage,
      totalPages,
      pagingCounter: skip + 1,
      meta: {},
    };
  }
}
