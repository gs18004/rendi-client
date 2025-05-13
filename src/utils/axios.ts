import { BASE_URL } from '~/constants/api';
import axios, { AxiosError } from 'axios';

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);
