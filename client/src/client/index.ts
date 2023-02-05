import axios, { AxiosError, AxiosRequestConfig } from "axios";
import LocalStorageService from "services/local-storage";

export const baseURL = process.env.REACT_APP_API_URL as string;

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL as string,
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.get("accessToken");

    if (token) {
      client.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

type ErrorConfig = AxiosRequestConfig & {
  isRetry?: boolean;
};

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as ErrorConfig;

    if (originalConfig.url !== "/auth/login" && error.response) {
      if (error.response.status === 401 && !originalConfig.isRetry) {
        originalConfig.isRetry = true;

        try {
          const accessToken = await client
            .get<{ accessToken: string }>("/auth/token/refresh")
            .then((response) => response.data.accessToken);

          LocalStorageService.set("accessToken", accessToken);
          return client(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default client;
