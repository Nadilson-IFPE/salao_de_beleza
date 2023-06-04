import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface IRequestConfig extends AxiosRequestConfig {
  onFailure?: (error: AxiosError) => void;
  onSuccess?: (response: AxiosResponse) => void;
}

const api = axios.create({
  baseURL: "http://localhost:3333",
});

const refreshSubscribers: Array<(token: string) => void> = [];

let failedRequest: Array<IRequestConfig> = [];

let isRefreshing = false;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token:semana-heroi");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError | unknown) => {
    const originalRequest = (error as AxiosError).config as IRequestConfig;
    if (error instanceof AxiosError && error.response?.status === 401) {
      if (
        error.response?.data &&
        error.response?.data.code === "token_expired"
      ) {
        if (!isRefreshing) {
          try {
            const refresh = localStorage.getItem("refresh_token:semana-heroi");
            const response = await api.post("/users/refresh", {
              refresh_token: refresh,
            });

            const { token, refresh_token: newToken } = response.data;
            localStorage.setItem("token:semana-heroi", token);
            localStorage.setItem("refresh_token:semana-heroi", newToken);
            isRefreshing = false;
            onRefreshed(token);

            if (originalRequest?.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axios(originalRequest);
          } catch (error) {
            failedRequest.forEach((request) => {
              request.onFailure?.(error as AxiosError);
            });
            failedRequest = [];
          }
        }
        return new Promise((resolve, reject) => {
          failedRequest.push({
            ...originalRequest,
            onSuccess: (response) => resolve(response),
            onFailure: (error) => reject(error),
          });
        });
      }
    } else {
    //  localStorage.removeItem("token:semana-heroi");
    //  localStorage.removeItem("refresh_token:semana-heroi");
    //  localStorage.removeItem("user:semana-heroi");
    }

    return Promise.reject(error);
  }
);

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
}

export { api };
