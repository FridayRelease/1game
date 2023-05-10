import { HttpClient } from './http-client';
import { ILeaderboardAddUser} from "@/api/types";

export class LiderApi {
  private http;

  constructor(url: string) {
    this.http = new HttpClient(url);
  }

  // включение User в таблицу лидеров
  add_user_to_leaderboard = async (data: ILeaderboardAddUser) => {
      return await this.http.post('/leaderboard', data);
  };
/*
  get_all_leaderboard = async (data: IRating) => {
    // получение всей таблицы лидеров
    return await this.http.post('/leaderboard/all', data);
  };
*/

  // получение своей таблицы лидеров - на самом деле только одной записи своего игрока
  get_team_leaderboard = async (teamName: string) => {
     return await this.http.post('/leaderboard/all', teamName);
  };


}
