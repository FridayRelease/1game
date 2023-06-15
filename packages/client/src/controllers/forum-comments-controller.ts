import { forumApi } from '@/api';
import { ICommentCreate } from '@/api/types';
import { mockComments } from '@/mock/mockComments';

//добавление Comment на сервер
export const addCommentToServer = async (info: ICommentCreate) => {
  try {
    const { data } = await forumApi.commentCreate(info);
    console.log('Comment на Сервер записали');
    return data;
  } catch (e) {
    console.log('Ошибка записи Comment на Сервер', e);
  }
};

// получаем с сервера все Comment

export const getCommentsAll = async () => {
  try {
    const { data } = await forumApi.getCommentsAll();
    console.log('Все Comments с Сервера получили');
    return data;
  } catch (e) {
    console.log('Ошибка получения списка Comments c Сервера', e);
    return mockComments;
  }
};

// получаем с сервера Comments по ID Topic
export const getCommentsByTopicId = async (id: number) => {

  try {
    const { data } = await forumApi.getCommentsByIdTopic(id);
    console.log(`Comments по Topic ${id} с Сервера получили = `, data);
    return data;
  } catch (e) {
    console.log('Ошибка получения Comment по id Topic с Сервера', e);

  }
};
// получаем с сервера Comments по ID Comment
export const getCommentsById = async (id: number) => {

  try {
    const { data } = await forumApi.getCommentsById(id);
    console.log(`Comments по  ${id} с Сервера получили = `, data);
    return data;
  } catch (e) {
    console.log('Ошибка получения Comment по id Topic с Сервера', e);
  }
};
// обновление Топика на сервере
export const updateComment = async (id: number, data: string) => {
  try {
    await forumApi.updateComment(id, data);
    console.log('Comment на Сервере обновили');
  } catch (e) {
    console.log('Ошибка обновления Comment на Сервере', e);
  }
};

// удаление Comment на сервере
export const deleteComment = async (id: number) => {
  try {
    await forumApi.deleteComment(id);
    console.log('Comment на Сервере удалили');
  } catch (e) {
    console.log('Ошибка удаления Comment на Сервере', e);
  }
};


