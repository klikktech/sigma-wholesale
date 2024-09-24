import { BASE_BACKEND_URL, REFRESH_TOKEN_URL } from "@/utils/urls";
import axios, { InternalAxiosRequestConfig } from "axios";
import { createSession, getAccessToken, getRefreshToken } from "./session";

const api = axios.create({
  baseURL: BASE_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
  // Add other configuration options if needed
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    const response = await axios.post(
      `${BASE_BACKEND_URL}/${REFRESH_TOKEN_URL}`, {}, { headers: { Authorization: refreshToken }});
    createSession(response.data);
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
};

export default api;
