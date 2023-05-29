import { HttpClient } from './http-client';
import {ICommentCreate, ITopicCreate} from "@/api/types";


export class ForumApi {
  private http;

  constructor(url: string) {
    this.http = new HttpClient(url);
  }
//topics
  //app.post('/api/v1/topics', [topicCreate]);
  // app.get('/api/v1/topics', [topicGet]);
  // app.get('/api/v1/topics/:id', [topicRead]);
  // app.put('/api/v1/topics/:id', [topicUpdate]);
  // app.delete('/api/v1/topics/:id', [topicDelete]);

  //Создать Топик и работа с ним
  topicCreate = async (data: ITopicCreate) => {
    return await this.http.post('/api/v1/topics', data);
  };
  getTopicsAll = async () => {//topicGet - string
    return await this.http.get(`/api/v1/topics/`);
  };
  getTopicById = async (id: number) => {//topicRead - string
    return await this.http.get(`/api/v1/topics/{id}`);
  };
  updateTopic = async (id: number, data:string) => {//topicUpdate
    return await this.http.put(`/api/v1/topics/{id}`, data);
  };

  deleteTopic = async (id: number) => {//topicDelete
    return await this.http.delete(`/api/v1/topics/{id}`);
  };

  /*
  * app.post('/api/v1/comments', [commentCreate]);
  * app.get('/api/v1/comments', [commentGet]);
  * app.get('/api/v1/comments/:id', [commentRead]);
  * app.put('/api/v1/comments/:id', [commentUpdate]);
  * app.delete('/api/v1/comments/:id', [commentDelete]);
  * */
  //Создать Комментарий и работа с ним
  commentCreate = async (data: ICommentCreate) => {
    return await this.http.post('/api/v1/comments', data);
  };
  getCommentsAll = async () => {//Get all comments
    return await this.http.get(`/api/v1/comments/`);
  };
  getCommentById = async (id: number) => {//commentRead by Id
    return await this.http.get(`/api/v1/comments/{id}`);
  };
  updateComment = async (id: number, data:string) => {//Update comment
    return await this.http.put(`/api/v1/comments/{id}`, data);
  };

  deleteComment = async (id: number) => {//delete comment
    return await this.http.delete(`/api/v1/comments/{id}`);
  };
}