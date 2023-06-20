import { forumTopicAPI } from '@/api';
import { ITopicCreateRequest, ITopicUpdateRequest } from '@/types/forum';

const getTopicList = async (user_id?: number) => {
  const response = await forumTopicAPI.topicList(user_id);

  return response.data;
};

const create = async (topicData: ITopicCreateRequest) => {
  const response = await forumTopicAPI.topicCreate(topicData);

  if (response.status === 201) {
    return response.data;
  }

  throw new Error('Произошла ошибка при создании топика');
};

const read = async (id: number) => {
  const response = await forumTopicAPI.topicRead(id);

  if (response.status === 200) {
    return response.data;
  }

  throw new Error('Произошла ошибка при получении указанного топика');
};

const update = async (topicData: ITopicUpdateRequest) => {
  const { id, ...data } = topicData;
  const response = await forumTopicAPI.topicUpdate(id, data);

  if (response.status === 200) {
    return response.data;
  }

  throw new Error('Произошла ошибка при изменении топика');
};

const remove = async (id: number) => {
  const response = await forumTopicAPI.topicDelete(id);

  if (response.status === 200) {
    return response.data;
  }

  throw new Error('Произошла ошибка при удалении топика');
};

export { getTopicList, create, read, remove, update };
