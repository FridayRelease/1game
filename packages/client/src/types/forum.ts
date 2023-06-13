interface ITopicCreateRequest {
  subject: string;
  user_id: number;
}

interface ITopicUpdateRequest {
  id: number;
  subject: string;
}

interface ICommentCreateRequest {
  message: string;
  user_id: number;
  topic_id: number;
  comment_id?: number;
}

interface ICommentUpdateRequest {
  id: number;
  message: string;
}

interface ICommentDeleteRequest {
  id: number;
  topic_id: number;
}

export {
  type ITopicCreateRequest,
  type ITopicUpdateRequest,
  type ICommentCreateRequest,
  type ICommentUpdateRequest,
  type ICommentDeleteRequest,
};
