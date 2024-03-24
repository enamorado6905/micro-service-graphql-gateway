import { PaginateInterface } from '../../interfaces/paginated.interface';

export class PaginationClass {
  private readonly paginationPage: number;
  private readonly paginationPerPage: number;
  private readonly paginationNodes: Array<any>;
  private readonly paginationTotal: number;

  constructor(page: number, limit: number, nodes: Array<any>, total: number) {
    this.paginationPage = page;
    this.paginationNodes = nodes;
    this.paginationTotal = total;
    this.paginationPerPage = limit;
  }

  /**
   * This function created object type pagination
   */
  public paginated(): PaginateInterface<any> {
    return {
      page: this.paginationPage,
      limit: this.paginationPerPage,
      total: this.paginationTotal,
      nodes: this.paginationNodes,
    };
  }
}
