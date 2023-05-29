import {forumApi} from "@/api";
import {AnyAction, Dispatch} from '@reduxjs/toolkit';
import {MockTopics} from "@/mock/mockTopics";
import {ForumActions} from "@/store/slices/forum-slice";
import {IComment, ICommentCreate} from "@/api/types";
import {mockComments} from "@/mock/mockComments";


//добавление Comment на сервер
export const addCommentToServer = async (info: ICommentCreate) => {
  try {
    const {data} = await forumApi.commentCreate(info);
    console.log('Comment на Сервер записали');
    return data;
  } catch (e) {
    console.log('Ошибка записи Comment на Сервер', e);
  }
};

// получаем с сервера все Comment

export const getCommentsAll = async () => {
  try {
    const {data} = await forumApi.getCommentsAll();
    console.log('Все Comments с Сервера получили');
    return data;
  } catch (e) {
    console.log('Ошибка получения списка Comments c Сервера', e);
    return mockComments;
  }
};

// получаем с сервера Comments по ID Topic
export const getCommentsByTopicId = async (id: number) => {
  const arr = []
  try {
    const {data} = await forumApi.getCommentById(id);
    console.log('Topic по Id с Сервера получили');
    return data;
  } catch (e) {
    console.log('Ошибка получения Comment по id с Сервера', e);
    console.log('Подставляем Моковые Комментарии по ID Топика')
    for (let i = 0; i < MockTopics.length; i++) {
      if (MockTopics[i].topic_id == id) {
        arr.push(MockTopics[i])
      }
    }

    return arr;
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


// запиcь данных в Store
//export const setForumDatasToStore = (data: ITopic[], dispatch: Dispatch<AnyAction>) => {
//  dispatch(ForumActions.setForumDatasFromServer(data));
//}