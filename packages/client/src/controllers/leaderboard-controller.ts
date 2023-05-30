import { leaderApi } from '@/api';
import { ILeaderboardAddUser, IQuery } from '@/api/types';

//добавление пользователя с его очками на сервер
export const addUserInfoToServer = async (info: ILeaderboardAddUser) => {
  try {
    await leaderApi.addUserToLeaderboard(info);
  } catch (e) {
    console.log('Ошибка записи на сервер результатов Игрока', e);
  }
};

// получаем с сервера данные игрока и его очки
export const getLeaderboardList = async (query: IQuery) => {
  try {
    const { data } = await leaderApi.getTeamLeaderboard(query);
    return data;
  } catch (e) {
    console.log('Ошибка получения списка лидеров ', e);
  }
};
