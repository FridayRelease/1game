interface IResponseWithPaginate<T> {
  count: number;
  rows: Array<T>;
  offset: number;
  elementCount: number;
}

export { type IResponseWithPaginate };
