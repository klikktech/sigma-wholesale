import { BASE_BACKEND_URL, REFRESH_TOKEN_URL } from "@/utils/urls";
import axios, { InternalAxiosRequestConfig } from "axios";
import { createSession, getAccessToken, getRefreshToken } from "./session";
import { AxiosErrorResponse } from "@/utils/types";

console.log(BASE_BACKEND_URL,"BASE_BACKEND_URL")

const axiosInstance = axios.create({
  baseURL: BASE_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
  // Add other configuration options if needed
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    const errorResponse = handleAxiosError(error);
    return Promise.reject(errorResponse);
  }
);

const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    const response = await axios.post(
      `${BASE_BACKEND_URL}/${REFRESH_TOKEN_URL}`,
      {},
      { headers: { Authorization: refreshToken } }
    );
    createSession(response.data);
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleAxiosError = (error: any): AxiosErrorResponse => {
  console.log(error.response.status,"error")
  if (error.response) {
    const status = error.response.status as number;
    switch (status) {
      case 401:
        return formatErrorResponse(
          error.response.data.message || "Unauthorized - Please log in again",
          status
        );
      case 403:
        return formatErrorResponse(
          "Access Denied - You don't have permission",
          status
        );
      case 500:
        return formatErrorResponse(
          error.response.data.message || "Internal Server Error - Please try again later",
          status
        );
      default:
        return formatErrorResponse(
          error.response.data.message || "An error occurred",
          status
        );
    }
  } else if (error.request) {
    return formatErrorResponse(
      "No response from server - Please try again",
      null
    );
  } else {
    return formatErrorResponse("Request error - Something went wrong", null);
  }
};

const formatErrorResponse = (
  message: string,
  status: number | null
): AxiosErrorResponse => {
  return { error: { message }, status };
};

export default axiosInstance;
