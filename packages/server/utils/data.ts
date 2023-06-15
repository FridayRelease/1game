import type { IResponseWithPaginate } from 'pagination';

const paginateResponse = <T>(count: number, rows: Array<T>, offset = 0, limit = 0): IResponseWithPaginate<T> => {
  return {
    count,
    rows,
    offset: offset * limit,
    elementCount: rows.length,
  };
};

export { paginateResponse };
