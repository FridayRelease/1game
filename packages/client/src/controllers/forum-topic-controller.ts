import { forumTopicAPI } from '@/api';
import { ITopicCreateRequest } from '@/types/forum';

const getTopicList = async () => {
  const response = await forumTopicAPI.topicList();

  return response.data;
};

const create = async (topicData: ITopicCreateRequest) => {
  const response = await forumTopicAPI.topicCreate(topicData);

  if (response.status === 201) {
    return response.data;
  }

  throw new Error('Произошла ошибка при авторизации');
};

export { getTopicList, create };
