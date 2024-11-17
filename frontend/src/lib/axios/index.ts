import {
  PRODUCTS_URL,
  SIGNUP_URL,
  LOGIN_URL,
  LOGOUT_URL,
  CART_URL,
  CHECK_OUT_URL,
  NEW_ARRIVALS_URL,
  ORDERS_URL,
  ORDER_ITEMS_URL,
  SEARCH_ITEMS_URL,
  USERS_DETAILS_URL,
  USER_UPDATE_URL,
} from "@/utils/urls";
import api from "./instance";
import { AxiosErrorResponse, AxiosResponse, RegisterDetails, UserDetails } from "@/utils/types";

export const axios = {
  auth: {
    signInWithEmail: async (credentials: {
      email: string;
      password: string;
    }): Promise<AxiosResponse> => {
      console.log("post sign in")
      try {
        const { data, status } = await api.post(LOGIN_URL, credentials);
        console.log(data, status, "inside index login")
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
  users: {
    getAddresses: async (type: string): Promise<AxiosResponse> => {
      console.log("get addresses", type)
      try {
        const { data, status } = await api.get(`/users/addresses?type=${type}`);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    deleteAddress: async (address: string): Promise<AxiosResponse> => {
      console.log("delete address", address)
      try {
        const { data, status } = await api.delete(`/address?address=${address}`);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getUserDetails: async (): Promise<AxiosResponse> => {
      console.log("get user details")
      try {
        const { data, status } = await api.get(USERS_DETAILS_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    updateUserDetails: async (userDetails: UserDetails): Promise<AxiosResponse> => {
      console.log("update user details", userDetails)
      try {
        const { data, status } = await api.put(USER_UPDATE_URL, userDetails);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    } 
  },
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
      console.log("get all prods products", page, size)
      try {
        const { data, status } = await api.get(`${PRODUCTS_URL}?page=${page}&size=${size}`);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getProductDetails: async (details: string): Promise<AxiosResponse> => {
      console.log("get prod details", details)
      try {
        const { data, status } = await api.get(`${PRODUCTS_URL}/${details}`);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getCategoryProducts: async (category: string, page: number, size: number) => {
      try {
        const response = await api.get(`/categories/${category}/products`, {
          params: { page, size }
        });
        return { data: response.data, error: null };
      } catch (error) {
        return { data: null, error };
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
    getOrdersList: async (): Promise<AxiosResponse> => {
      console.log("get orders list")
      try {
        const { data, status } = await api.get(ORDERS_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getOrderItemsList: async (orderId: string): Promise<AxiosResponse> => {
      console.log("get orders list")
      try {
        const { data, status } = await api.get(ORDER_ITEMS_URL(orderId));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getSearchProductsList: async (keyword: string, page: number, size: number): Promise<AxiosResponse> => {
      console.log("get search list")
      try {
        const { data, status } = await api.get(SEARCH_ITEMS_URL(keyword), {
          params: { page, size }
        });
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  }
};
