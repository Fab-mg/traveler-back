export class PaginatedResult<T> {
  constructor(items: Array<T>, total: number, maxPage: number) {
    this.items = items;
    this.total = total;
    this.maxPage = maxPage;
  }
  items: T[];
  total: number;
  maxPage: number;
}
