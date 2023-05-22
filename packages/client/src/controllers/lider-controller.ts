import { liderApi } from '@/api';
import { ILeaderboardAddUser, IQuery } from '@/api/types';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { IErrorState } from '@/store/slices/error-slice';
import Leaderboard from '@/pages/leaderboard';
import { LeaderboardActions, ILeader, ILeaderboardState } from '@/store/slices/leaderboard-slice';
import { AppDispatch } from '@/store/store';

//добавление пользователя с его очками на сервер
export const addUserDatasToServer = async (info: ILeaderboardAddUser) => {
  const { data } = await liderApi.add_user_to_leaderboard(info);
  console.log('info addUserDatasToServer=', info);

  if (data === 'OK') {
    return data;
  }
  console.log('data is not OK = ', data);

  throw new Error('Произошла ошибка при добавлении пользователя');
};

// получаем с сервера данные игрока и его очки
export const getLeaderboardDatas = async (query: IQuery) => {
  console.log('Start in getLeaderboardDatas');
  const { data } = await liderApi.get_team_leaderboard(query);
  console.log('END in getLeaderboardDatas');
  return data;

  //throw new Error('Произошла ошибка при получении данных пользователя и его очков с сервера ');
};
//------------------
// запиcь данных в Store
export const setUserDatasToStore = (data: ILeader, dispatch: Dispatch<AnyAction>) => {
  dispatch(LeaderboardActions.setLeaderboard(data));
};
