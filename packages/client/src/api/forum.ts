import { HttpClient } from './http-client';
import { ICommentCreate, ITopicCreate } from '@/api/types';

export class ForumApi {
  private http;

  constructor(url: string) {
    this.http = new HttpClient(url);
  }

  async resources(img: string) { return await this.http.get('/resources/${img}'); }

  //Создать Топик и работа с ним
  topicCreate = async (data: ITopicCreate) => {
    return await this.http.post('/topics/', data);
  };
  getTopicsAll = async () => {
    //topicGet - string
    return await this.http.get(`/topics/`);
  };
  getTopicById = async (id: number) => {
    //topicRead - string
    return await this.http.get(`/topics/${id}`);
  };
  updateTopic = async (id: number, data: string) => {
    //topicUpdate
    return await this.http.put(`/topics/${id}`, data);
  };

  deleteTopic = async (id: number) => {
    //topicDelete
    return await this.http.delete(`/topics/${id}`);
  };

  //Создать Комментарий и работа с ним
  commentCreate = async (data: ICommentCreate) => {
    return await this.http.post('/comments', data);
  };
  getCommentsAll = async () => {
    //Get all comments
    return await this.http.get(`/comments/`);
  };
  getCommentsById = async (id: number) => {
    //commentRead by Id
    return await this.http.get(`/comments/${id}`);
  };
  getCommentsByIdTopic = async (id: number) => {
    //commentRead by Id Topic
    return await this.http.get(`/comments/topic/${id}`);
  };
  updateComment = async (id: number, data: string) => {
    //Update comment
    return await this.http.put(`/comments/${id}`, data);
  };

  deleteComment = async (id: number) => {
    //delete comment
    return await this.http.delete(`/comments/${id}`);
  };

  getUsers = async () => {
    return await this.http.get(`/users/`);
  };
}
