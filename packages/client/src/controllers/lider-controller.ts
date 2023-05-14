import {liderApi} from '@/api';
import {ILeaderboardAddUser, IQuery} from "@/api/types";

//добавления пользователя с его очками
export const addUser = async (info: ILeaderboardAddUser) => {
  const { data } = await liderApi.add_user_to_leaderboard(info);

  if (data ==='Ok') {
    return data;
  }

  throw new Error('Произошла ошибка при добавлении пользователя');
};

const gameName =  '1game'
const query:IQuery = {// сортировка score, 1 страница на 10 записей
  ratingFieldName: "score",
  cursor: 0,
  limit:10,
}
  // получаем с сервера данные игрока и его очки и записываем в Store
export const getLeaderboardDatas = async (gameName:string, query:IQuery) => {
  const { data } = await liderApi.get_team_leaderboard(gameName, query);

  if (data !==null) {
    return data;
  }

  throw new Error('Произошла ошибка при получении данных пользователей и очков ');
};




