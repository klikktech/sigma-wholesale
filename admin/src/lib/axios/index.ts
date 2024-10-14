import { SIGNIN_ENDPOINT } from "@/utils/urls";
import api from "./instance";
import { AxiosErrorResponse, AxiosResponse } from "@/utils/types";

export const axios = {
  auth: {
    signInWithEmail: async (credentials: {
      email: string;
      password: string;
    }): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(SIGNIN_ENDPOINT, credentials);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  }
};
