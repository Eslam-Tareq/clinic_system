interface PaginationMeta {
  currentPage: number;
  perviousPage?: number;
  nextPage?: number;
  limit: number;
  numOfPages: number;
  numOfItems?: number;
  totalItems: number;
}
