import { HttpClient } from './http-client';
import { ForumCommentDTO, ForumCommentsDTO } from '@/api/types';
import { ICommentCreateRequest, ICommentUpdateRequest } from '@/types/forum';

export class ForumCommentApi {
  private http;

  constructor(url: string) {
    this.http = new HttpClient(url);
  }

  commentList = async (topic_id: number) => {
    return await this.http.get<ForumCommentsDTO>(`comments/topic/${topic_id}`);
  };

  commentCreate = async (data: ICommentCreateRequest) => {
    return await this.http.post<ForumCommentDTO>('comments', data);
  };

  commentUpdate = async (id: number, data: Omit<ICommentUpdateRequest, 'id' | 'topic_id'>) => {
    return await this.http.put<ForumCommentDTO>(`comments/${id}`, data);
  };

  commentDelete = async (id: number) => {
    return await this.http.delete<{ message: string }>(`comments/${id}`);
  };
}
