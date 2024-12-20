export class PaginationClass {
  constructor(pageNumber?: number, pageSize?: number) {
    this.pageNumber = pageNumber > 0 ? pageNumber : 1;
    this.pageSize = pageSize > 0 ? pageSize : 10;
  }
  pageNumber?: number;
  pageSize?: number;
}
