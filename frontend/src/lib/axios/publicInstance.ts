import { BASE_BACKEND_URL } from "@/utils/urls";
import axios from "axios";
import { AxiosErrorResponse } from "@/utils/types";

console.log(BASE_BACKEND_URL,"BASE_BACKEND_URL")

const publicInstance = axios.create({
  baseURL: BASE_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
  // Add other configuration options if needed
});

publicInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
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

export default publicInstance;
