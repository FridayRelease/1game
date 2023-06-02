import { forumApi } from '@/api';
import { ITopicCreate } from '@/api/types';
import { MockTopics } from '@/mock/mockTopics';
import { Users } from '@/mock/mockUsers';

//добавление Topic на сервер
export const addTopicToServer = async (info: ITopicCreate) => {
  try {
    const { data } = await forumApi.topicCreate(info);
    console.log('Topic на Сервер записали');
    return data;
  } catch (e) {
    console.log('Ошибка записи Topic на Сервер', e);
  }
};

// получаем с сервера все Топики
export const getTopicsAll = async () => {
  try {
    const { data } = await forumApi.getTopicsAll();

    console.log('All Topics с Cервера получены = ', data);
    return data;
  } catch (e) {
    console.log('Ошибка получения списка Топиков c Сервера', e);

    return MockTopics;
  }
};

// получаем с сервера Топики по ID
export const getTopicById = async (id: number) => {

  try {
    const data = await forumApi.getTopicById(id);
    console.log('Topic по Id с Сервера получили');
    return data;
  } catch (e) {
    console.log('Ошибка получения Топика по id с Сервера', e);
    return MockTopics[id + 1];
  }
};

// обновление Топика на сервере
export const updateTopic = async (id: number, data: string) => {
  try {
    await forumApi.updateTopic(id, data);
    console.log('Topic на Сервере обновили');
  } catch (e) {
    console.log('Ошибка обновления Топика на Сервере', e);
  }
};

// удаление Топика на сервере
export const deleteTopic = async (id: number) => {
  try {
    await forumApi.deleteTopic(id);
    console.log('Topic на Сервере удалили');
  } catch (e) {
    console.log('Ошибка удаления Топика на Сервере', e);
  }
};

//Получение списка друзей для чата
export const getUsers = async () => {
  try {
    const users = await forumApi.getUsers();
    console.log('Получили список Users с Сервера = ', users);
    return users;
  } catch (e) {
    console.log('Ошибка получения списка Users с Сервера', e);
    return Users;
  }
};
