import { SIGNIN_ENDPOINT, SIGNOUT_ENDPOINT } from "@/utils/urls";
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
    signOut: async () => {
      try {
        const { data, status } = await api.post(SIGNOUT_ENDPOINT);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  }
};
