interface RequestWithId {
  id: number;
}

interface IQueryPagination {
  limit: number;
  offset: number;
  textSearch?: string;
}

export {
  type RequestWithId,
  type IQueryPagination
}
