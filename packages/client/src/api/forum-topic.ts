import { HttpClient } from './http-client';
import { ForumTopicDTO, ForumTopicsDTO } from '@/api/types';
import { ITopicCreateRequest, ITopicUpdateRequest } from '@/types/forum';

export class ForumTopicApi {
  private http;

  constructor(url: string) {
    this.http = new HttpClient(url);
  }

  topicList = async (user_id: number | undefined) => {
    if (user_id) {
      return await this.http.get<ForumTopicDTO>(`topics?user_id=${user_id}`);
    }
    return await this.http.get<ForumTopicsDTO>('topics');
  };

  topicCreate = async (data: ITopicCreateRequest) => {
    return await this.http.post<ForumTopicDTO>('topics', data);
  };

  topicRead = async (id: number) => {

    return await this.http.get<ForumTopicDTO>(`topics/${id}`);
  };

  topicUpdate = async (id: number, data: Omit<ITopicUpdateRequest, 'id'>) => {
    return await this.http.put<ForumTopicDTO>(`topics/${id}`, data);
  };

  topicDelete = async (id: number) => {
    return await this.http.delete<{ message: string }>(`topics/${id}`);
  };
}
