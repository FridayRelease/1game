import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type AllowedData = FormData | File | string | object | null;

export class HttpClient {
  private axios: AxiosInstance;

  constructor(private prefixUrl: string, config: AxiosRequestConfig = {}) {
    this.axios = axios.create({
      baseURL: prefixUrl,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      timeout: 5000,
      ...config,
    });
  }

  public get<T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) {
    return this.axios.get<T>(url, config);
  }

  public post<T>(url: string, data?: AllowedData, config?: AxiosRequestConfig) {
    return this.axios.post<T>(url, data, config);
  }

  public put<T>(url: string, data: AllowedData) {
    const options: AxiosRequestConfig = {};

    if (data instanceof FormData) {
      options.headers = { 'Content-Type': 'multipart/form-data' };
    }

    return this.axios.put<T>(url, data, options);
  }
}
