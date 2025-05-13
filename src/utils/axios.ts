import { BASE_URL, END_POINT } from '~/constants/api';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from './token';

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들을 저장하는 배열
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 갱신 대기 중인 요청들을 실행하는 함수
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 토큰 갱신 대기 중인 요청을 추가하는 함수
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 요청 인터셉터
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 401 에러이고, 토큰 갱신 중이 아닐 때
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        // 리프레시 토큰으로 새로운 액세스 토큰 요청
        const response = await http.get(END_POINT.AUTH.REFRESH);
        const { access_token: accessToken, refresh_token: refreshToken } =
          response.data;

        // 새로운 토큰 저장
        tokenStorage.setAccessToken(accessToken);
        if (refreshToken) {
          tokenStorage.setRefreshToken(refreshToken);
        }

        // 토큰 갱신 성공 시 대기 중인 요청들 실행
        onRefreshed(accessToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 토큰 삭제하고 로그인 페이지로 리다이렉트
        tokenStorage.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 토큰 갱신 중일 때는 요청을 대기열에 추가
    if (isRefreshing) {
      return new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(http(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  },
);
