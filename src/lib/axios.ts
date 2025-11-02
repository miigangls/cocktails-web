import axios from 'axios';
import { getEnv } from './env';

const { apiBaseUrl, isDev } = getEnv();

export const http = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status ?? 0;
    const message =
      error?.response?.data?.message ?? error?.message ?? 'Unexpected error while requesting the API';
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error('[HTTP]', status, message, error?.config?.url);
    }
    return Promise.reject({ message, status } as { message: string; status: number });
  },
);

export type NormalizedError = { message: string; status: number };
