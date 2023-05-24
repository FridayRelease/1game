import { liderApi } from '@/api';
import { ILeaderboardAddUser, IQuery } from '@/api/types';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { LeaderboardActions, ILeader, ILeaderboardState } from '@/store/slices/leaderboard-slice';

//добавление пользователя с его очками на сервер
export const addUserDatasToServer = async (info: ILeaderboardAddUser) => {
  try {
    const { data } = await liderApi.addUserToLeaderboard(info);
    console.log('Данные игрока и очки на Сервер записали');
  } catch (e) {
    console.log('Ошибка записи на сервер результатов Игрока', e);
  }
};

// получаем с сервера данные игрока и его очки
export const getLeaderboardDatas = async (query: IQuery) => {
  try {
    const { data } = await liderApi.getTeamLeaderboard(query);
    return data;
  } catch (e) {
    console.log('Ошибка получения списка лидеров ', e);
  }
};

// запиcь данных в Store
export const setUserDatasToStore = (data: ILeader, dispatch: Dispatch<AnyAction>) => {
  dispatch(LeaderboardActions.setLeaderboard(data));
};
