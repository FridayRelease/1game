interface RequestWithId {
  id: number;
}

interface IQueryPagination {
  limit: number;
  offset: number;
  textSearch?: string;
  user_id?: number;
}

export {
  type RequestWithId,
  type IQueryPagination
}
