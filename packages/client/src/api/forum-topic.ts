import { HttpClient } from './http-client';
import { ForumTopicDTO, ForumTopicsDTO } from '@/api/types';
import { ITopicCreateRequest } from '@/types/forum';

export class ForumTopicApi {
  private http;

  constructor(url: string) {
    this.http = new HttpClient(url);
  }

  topicList = async () => {
    return await this.http.get<ForumTopicsDTO>('topics');
  };

  topicCreate = async (data: ITopicCreateRequest) => {
    return await this.http.post<ForumTopicDTO>('topics', data);
  };
}
