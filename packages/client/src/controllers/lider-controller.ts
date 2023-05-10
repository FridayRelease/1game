import {liderApi} from '@/api';
import {ILeaderboardAddUser} from "@/api/types";

//добавления пользователя с его очками
export const addUser = async (info: ILeaderboardAddUser) => {
  const { data } = await liderApi.add_user_to_leaderboard(info);

  if (data !=='Ok') {
    return data;
  }

  throw new Error('Произошла ошибка при добавлении пользователя');
};




