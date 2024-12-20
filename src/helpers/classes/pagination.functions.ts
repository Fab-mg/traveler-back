import { PaginationClass } from './pagination.class.dto';

const getPageSize = (pageSize?: number) => {
  if (pageSize) {
    return pageSize > 0 ? pageSize : 10;
  } else {
    return 10;
  }
};

const getPageNumber = (pageNumber?: number) => {
  if (pageNumber) {
    return pageNumber > 0 ? pageNumber : 1;
  } else {
    return 1;
  }
};

const getPagination = (paginationDTO: PaginationClass): PaginationClass => {
  const pageSize = getPageSize(paginationDTO.pageSize);
  const pageNumber = getPageNumber(paginationDTO.pageNumber);
  return new PaginationClass(pageNumber, pageSize);
};

export { getPagination, getPageSize, getPageNumber };
