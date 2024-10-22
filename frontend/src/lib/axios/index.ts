import {
  PRODUCTS_URL,
  SIGNUP_URL,
  LOGIN_URL,
  LOGOUT_URL,
} from "@/utils/urls";
import api from "./instance";
import { AxiosErrorResponse, AxiosResponse, RegisterDetails } from "@/utils/types";

export const axios = {
  auth: {
    signInWithEmail: async (credentials: {
      email: string;
      password: string;
    }): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(LOGIN_URL, credentials);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    signUpWithEmail: async (userDetails: RegisterDetails): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(SIGNUP_URL, userDetails);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    signOut: async (): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(LOGOUT_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
  // users: {
  //   getAllUsers: async (): Promise<AxiosResponse> => {
  //     try {
  //       const { data, status } = await api.get(GET_ALL_USERS_ENDPOINT);
  //       return { data, status };
  //     } catch (error) {
  //       return error as AxiosErrorResponse;
  //     }
  //   },

  // },
  products: {
    getAllProducts: async (): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(PRODUCTS_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  }
};
