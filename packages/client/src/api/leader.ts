import { HttpClient } from './http-client';
import { ILeaderboardAddUser, IQuery, LeaderboardListDTO } from '@/api/types';

export class LeaderApi {
  private http;

  constructor(url: string) {
    this.http = new HttpClient(url);
  }

  // включение User в таблицу лидеров на сервере
  addUserToLeaderboard = async (data: ILeaderboardAddUser) => {
    return await this.http.post('/leaderboard', data);
  };
  // получение своей таблицы лидеров - на самом деле только одной записи одного игрока
  getTeamLeaderboard = async (query: IQuery) => {
    return await this.http.post<LeaderboardListDTO[]>(`/leaderboard/1game`, query);
  };
}
