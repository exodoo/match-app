import axios, { Method } from 'axios';

export class ApiClientService {
  private readonly apiUrl = import.meta.env.VITE_API_URL as string;
  private static _instance: ApiClientService;

  static getInstance() {
    if (!ApiClientService._instance) {
      ApiClientService._instance = new ApiClientService();
    }
    return ApiClientService._instance;
  }

  private async request<T, P = Record<string, string | string[]>>({
    method,
    resource,
    params,
    body,
    skipAuth,
  }: {
    method: Method;
    resource: string;
    params?: P;
    body?: unknown;
    skipAuth?: boolean;
  }) {
    try {
      const id = localStorage.getItem('id');

      if (!id && !skipAuth) {
        throw new Error('No id available');
      }

      const response = await axios.request<T>({
        baseURL: this.apiUrl,
        headers: skipAuth
          ? {}
          : {
              Authorization: `Bearer ${id}`,
            },
        method,
        url: resource,
        params,
        data: body,
      });
      return response.data;
    } catch (e: any) {
      //TODO add error handling
      if (e?.response?.status === 401 && !skipAuth) {
        localStorage.removeItem('id');
      }
      throw e;
    }
  }

  get<T, P = Record<string, string | string[]>>(resource: string, params?: P, skipAuth = false) {
    return this.request<T, P>({ method: 'GET', resource, params, skipAuth });
  }

  post<T>(resource: string, body: unknown, skipAuth = false) {
    return this.request<T>({ method: 'POST', resource, body, skipAuth });
  }

  put<T>(resource: string, body: unknown, skipAuth = false) {
    return this.request<T>({ method: 'PUT', resource, body, skipAuth });
  }

  patch<T>(resource: string, body: unknown, skipAuth = false) {
    return this.request<T>({ method: 'PUT', resource, body, skipAuth });
  }
}