interface ITopicCreateRequest {
  subject: string;
  user_id: number;
}

interface ITopicUpdateRequest {
  id: number;
  subject: string;
}

export { type ITopicCreateRequest, type ITopicUpdateRequest };
