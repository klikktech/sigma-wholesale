"use server";
import { BASE_BACKEND_URL } from "@/utils/urls";
import axios, { InternalAxiosRequestConfig } from "axios";
import { createSession, getAccessToken, getRefreshToken } from "./session";
import { AxiosErrorResponse } from "@/utils/types";
import { axios as api } from "@/lib/axios";

export const authInstance = axios.create({
  baseURL: BASE_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
  // Add other configuration options if needed
});

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

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorResponse = handleAxiosError(error);
    return Promise.reject(errorResponse);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.method != "get"
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      const { data, status, error } = await api.auth.refreshToken(
        refreshToken as string
      );
      if (error) {
        return Promise.reject({ error, status });
      } else {
        if (data.accessToken) {
          createSession(data);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      }
    }
    const errorResponse = handleAxiosError(error);
    return Promise.reject(errorResponse);
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleAxiosError = (error: any): AxiosErrorResponse => {
  if (error.response) {
    const status = error.response.status as number;
    switch (status) {
      case 401:
        return formatErrorResponse(
          error.response.data.message || "Unauthorised - Please log in again",
          status
        );
      case 403:
        return formatErrorResponse(
          "Access Denied - You don't have permission",
          status
        );
      case 500:
        return formatErrorResponse(
          "Internal Server Error - Please try again later",
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
