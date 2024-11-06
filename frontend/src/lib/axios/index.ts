import {
  PRODUCTS_URL,
  SIGNUP_URL,
  LOGIN_URL,
  LOGOUT_URL,
  CART_URL,
  CHECK_OUT_URL,
  NEW_ARRIVALS_URL,
} from "@/utils/urls";
import api from "./instance";
import { AxiosErrorResponse, AxiosResponse, RegisterDetails } from "@/utils/types";

export const axios = {
  auth: {
    signInWithEmail: async (credentials: {
      email: string;
      password: string;
    }): Promise<AxiosResponse> => {
      console.log("post sign in")
      try {
        const { data, status } = await api.post(LOGIN_URL, credentials);
        console.log(data,status,"inside index login")
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
    getNewArrivals: async (): Promise<AxiosResponse> => {
      console.log("get new arraivalss")
      try {
        const { data, status } = await api.get(`${NEW_ARRIVALS_URL}`);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getAllProducts: async (page: number, size: number): Promise<AxiosResponse> => {
      console.log("get all prods products",page,size)
      try {
        const { data, status } = await api.get(`${PRODUCTS_URL}?page=${page}&size=${size}`);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getProductDetails: async (details: string): Promise<AxiosResponse> => {
      console.log("get prod details",details)
      try {
        const { data, status } = await api.get(`${PRODUCTS_URL}/${details}`);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    addToCart: async (payload: any): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(CART_URL, payload);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getCartList: async (): Promise<AxiosResponse> => {
      console.log("get cart list")
      try {
        const { data, status } = await api.get(CART_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    checkOut: async (payload: any): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(CHECK_OUT_URL, payload);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  }
};
