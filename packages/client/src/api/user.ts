import { IUserSigninRequest, IUserSignupRequest } from '@/types/user';
import { HttpClient } from './http-client';
import { IUserDTO, SignUpResponseDTO } from '@/api/types';

export class UserApi {
  private http;

  constructor(url: string) {
    this.http = new HttpClient(url);
  }

  signin = async (data: IUserSigninRequest) => {
    // Авторизоваться
    return await this.http.post('/auth/signin', data);
  };

  signup = async (data: IUserSignupRequest) => {
    // Создать нового пользователя
    return await this.http.post<SignUpResponseDTO>('/auth/signup', data);
  };

  async signout() {
    // Выход
    return await this.http.post('/logout');
  }

  userInfo = async () => {
    // Получить информацию о пользователе
    return await this.http.get<IUserDTO>('/auth/user');
  };
}
