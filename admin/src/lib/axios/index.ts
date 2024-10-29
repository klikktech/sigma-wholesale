import {
  ADD_PRODUCT_ENDPOINT,
  GET_ALL_PRODUCTS_ENDPOINT,
  GET_ALL_USERS_ENDPOINT,
  GET_PRODUCT_ENDPOINT,
  SIGNIN_ENDPOINT,
  SIGNOUT_ENDPOINT,
} from "@/utils/urls";
import api from "./instance";
import {
  AxiosErrorResponse,
  AxiosResponse,
  ProductDetails,
  UserDetails,
} from "@/utils/types";

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
        const { data, status } = await api.post(
          GET_ALL_USERS_ENDPOINT,
          userDetails
        );
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
    getProductForDetails: async (details: string): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_PRODUCT_ENDPOINT(details));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    addProduct: async (
      productDetails: ProductDetails
    ): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(
          ADD_PRODUCT_ENDPOINT,
          productDetails
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
};
