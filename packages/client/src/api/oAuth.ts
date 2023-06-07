import { HttpClient } from '@/api/http-client';
import { IOAuthRequest } from '@/types/user';

class OAuth {
  private http;

  constructor(url: string) {
    this.http = new HttpClient(url);
  }

  public async getAppId(redirect_id: string) {
    return await this.http
      .get<{ service_id: string }>(`/oauth/yandex/service-id?redirect_uri=${redirect_id}`)
      .then(res => res.data);
  }

  public async getServiceInfo(data: IOAuthRequest) {
    return await this.http.post('/oauth/yandex', data);
  }
}

export { OAuth };
