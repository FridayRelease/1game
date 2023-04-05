import { HttpClient } from './http-client';

export class GameApi {
  private http;

  constructor(url: string) {
    this.http = new HttpClient(url);
  }

  loadImage = async (url: string): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
      const image = new Image();
      image.addEventListener('load', () => {
        resolve(image);
      });
      image.src = url;
    });
  };

  loadSprites = async <T>(name: string) => {
    // Получить информацию о пользователе
    return await this.http.get<T>(`/sprites/${name}.json`).then(res => res.data);
  };

  loadLevel = async <T>(name: string) => {
    return await this.http.get<T>(`levels/${name}.json`).then(res => res.data);
  };
}
