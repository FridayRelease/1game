import {forumApi} from "@/api";
import {ITopic, ITopicCreate} from "@/api/types";
import {AnyAction, Dispatch, Store} from '@reduxjs/toolkit';
import  {MockTopics} from "@/mock/mockTopics";
import {ForumActions} from "@/store/slices/forum-slice";
import {mockTopicsString} from "@/mock/mockTopicsString";



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

    console.log('All Topics с Cервера получены = ', data)
    return data;
  } catch (e) {
    console.log('Ошибка получения списка Топиков c Сервера', e);

    return mockTopicsString;
  }
};
// Топики - обработка полученные с сервера строки и запись обьекта в Стор - forum
export const getTopicsAndPrepare = async () => {
  let data:any;
  try {
    data  = await forumApi.getTopicsAll();
    console.log('Все Topic c Сервера получили', data);
    return data
  } catch (e) {
     data = mockTopicsString;
    console.log('Ошибка получения списка Топиков c Сервера', e);
    return data
  }

 // const result = data.type === 'string' ? JSON.parse(data) : ''
 // return result;
};
// получаем с сервера Топики по ID
export const getTopicByIdPrepare = async (id:number) => {
  let data:any;
  try {
    data  = await forumApi.getTopicById(id);
    console.log('Topic по Id с Сервера получили');

  } catch (e) {
    console.log('Ошибка получения Топика по id с Сервера', e);
    return MockTopics[id+1];
  }
  const result = data.type === 'string' ? JSON.parse(data) : ''
  return result;
};

// обновление Топика на сервере
export const updateTopic = async (id:number, data:string) => {
  try {
    await forumApi.updateTopic(id, data);
    console.log('Topic на Сервере обновили');
  } catch (e) {
    console.log('Ошибка обновления Топика на Сервере', e);
  }
};

// удаление Топика на сервере
export const deleteTopic = async (id:number) => {
  try {
    await forumApi.deleteTopic(id);
    console.log('Topic на Сервере удалили');

  } catch (e) {
    console.log('Ошибка удаления Топика на Сервере', e);

  }
};

