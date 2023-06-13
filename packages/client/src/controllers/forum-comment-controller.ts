import { forumCommentAPI } from '@/api';
import { ICommentCreateRequest, ICommentUpdateRequest } from '@/types/forum';

const getCommentList = async (topic_id: number) => {
  const response = await forumCommentAPI.commentList(topic_id);

  return response.data;
};

const create = async (commentData: ICommentCreateRequest) => {
  const response = await forumCommentAPI.commentCreate(commentData);

  if (response.status === 201) {
    return response.data;
  }

  throw new Error('Произошла ошибка при создании комментария');
};

const update = async (commentData: ICommentUpdateRequest) => {
  const { id, ...data } = commentData;
  const response = await forumCommentAPI.commentUpdate(id, data);

  if (response.status === 200) {
    return response.data;
  }

  throw new Error('Произошла ошибка при изменении комментария');
};

const remove = async (id: number) => {
  const response = await forumCommentAPI.commentDelete(id);

  if (response.status === 200) {
    return response.data;
  }

  throw new Error('Произошла ошибка при удалении комментария');
};

export { getCommentList, create, remove, update };
