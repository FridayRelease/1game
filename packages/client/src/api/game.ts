import { HttpClient } from './http-client';
import { ILevelDTO, ISoundSheetDTO, ISpriteSheetDTO } from './types';

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

  loadAudio = async (url: string) => {
    return await this.http.get<ArrayBuffer>(url, { responseType: 'arraybuffer' }).then(res => res.data);
  };

  loadAudioSheet = async (name: string) => {
    return await this.http.get<ISoundSheetDTO>(`/sounds/${name}.json`).then(res => res.data);
  };

  loadSprites = async (name: string) => {
    // Получить информацию о пользователе
    return await this.http.get<ISpriteSheetDTO>(`/sprites/${name}.json`).then(res => res.data);
  };

  loadLevel = async (name: string) => {
    return await this.http.get<ILevelDTO>(`levels/${name}.json`).then(res => res.data);
  };
}
