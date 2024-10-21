import {
  GET_ALL_PRODUCTS_ENDPOINT,
  GET_ALL_USERS_ENDPOINT,
  SIGNIN_ENDPOINT,
  SIGNOUT_ENDPOINT,
} from "@/utils/urls";
import api from "./instance";
import { AxiosErrorResponse, AxiosResponse, UserDetails } from "@/utils/types";

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
    signOut: async (): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(SIGNOUT_ENDPOINT);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
  users: {
    getAllUsers: async (): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_ALL_USERS_ENDPOINT);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    addUser: async (userDetails: UserDetails): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(GET_ALL_USERS_ENDPOINT, userDetails);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
  products: {
    getAllProducts: async (): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_ALL_PRODUCTS_ENDPOINT);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  }
};
