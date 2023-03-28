import { PATH } from '@/constant/paths';
import { IUserSigninRequest, IUserSignupRequest } from '@/types/user';
import { HttpClient } from './http-client';
import { IUserDTO, SignUpResponseDTO } from './types';

export class UserApi {
  private http = new HttpClient(PATH.AUTH);

  signin = async (data: IUserSigninRequest) => {
    // Авторизоваться
    return await this.http.post('/auth/signin', data).text();
  };

  signup = async (data: IUserSignupRequest) => {
    // Создать нового пользователя
    return await this.http.post('/auth/signup', data).json<SignUpResponseDTO>();
  };

  async signout() {
    // Выход
    return await this.http.post('/logout').text();
  }

  userInfo = async () => {
    // Получить информацию о пользователе
    return await this.http.get('/auth/user').json<IUserDTO>();
  };

  userAvatar = async (path: string | null) => {
    // Поиск ресурса
    if (!path) {
      return null;
    }
    return this.http
      .get(`/resources/${path}`)
      .blob()
      .then(blob => {
        return URL.createObjectURL(blob);
      });
  };
}
