import {
  ADD_PRODUCT_ENDPOINT,
  GET_ALL_PRODUCTS_ENDPOINT,
  GET_ALL_USERS_ENDPOINT,
  GET_PRODUCT_ENDPOINT,
  REFRESH_TOKEN_URL,
  SIGNIN_ENDPOINT,
  SIGNOUT_ENDPOINT,
  GET_USER_ENDPOINT,
  EDIT_USERS_ENDPOINT,
  ADD_USER_ENDPOINT
} from "@/utils/urls";
import api, { authInstance } from "./instance";
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
        const { data, status } = await authInstance.post(
          SIGNIN_ENDPOINT,
          credentials
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    refreshToken: async (refreshToken: string): Promise<AxiosResponse> => {
      try {
        const { data, status } = await authInstance.post(
          REFRESH_TOKEN_URL,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );
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
          ADD_USER_ENDPOINT,
          userDetails
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getUserDetails: async (email: string): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_USER_ENDPOINT(email));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    editUser: async (userDetails: UserDetails): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.put(
          EDIT_USERS_ENDPOINT,
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
    addProduct: async (formData: FormData): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(
          ADD_PRODUCT_ENDPOINT,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    updateProduct: async (formData: FormData): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.put(
          ADD_PRODUCT_ENDPOINT,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
};
