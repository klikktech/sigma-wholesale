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
  ADD_USER_ENDPOINT,
  GET_ALL_ORDERS_ENDPOINT,
  GET_ORDER_DETAILS_ENDPOINT,
  DELETE_PRODUCT_ENDPOINT,
  DELETE_USER_ENDPOINT,
  SEARCH_PRODUCTS_URL,
  EDIT_ORDER_ENDPOINT,
  DELETE_ORDER_ENDPOINT,
  GET_BRANDS_URL,
  DELETE_BRAND_URL,
  ADD_OR_UPDATE_BRANDS_URL,
  GET_CATEGORIES_URL,
  SEARCH_ORDERS_URL,
  GET_BANNERS_URL,
  DELETE_BANNER_URL,
  ADD_OR_UPDATE_BANNERS_URL
} from "@/utils/urls";
import api, { authInstance } from "./instance";
import {
  AxiosErrorResponse,
  AxiosResponse,
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
    getAllUsers: async (page:number,size:number): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_ALL_USERS_ENDPOINT,{
          params: { page, size }
        });
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
    deleteUser: async (email: string): Promise<AxiosResponse> => {
      console.log("delete user", email)
      try {
        const { data, status } = await api.delete(DELETE_USER_ENDPOINT(email));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getSearchUsersList: async (keyword: string): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_USER_ENDPOINT(keyword));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
  products: {
    getAllProducts: async (page:number,size:number): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_ALL_PRODUCTS_ENDPOINT,{
          params: { page, size }
        });
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
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
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
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          }
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    deleteProduct: async (details: any): Promise<AxiosResponse> => {
      console.log("delete product", details)
      try {
        const { data, status } = await api.delete(DELETE_PRODUCT_ENDPOINT(details));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getSearchProductsList: async (keyword: string, page: number, size: number): Promise<AxiosResponse> => {
      console.log("get search list")
      try {
        const { data, status } = await api.get(SEARCH_PRODUCTS_URL(keyword), {
          params: { page, size }
        });
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getCategories: async (): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_CATEGORIES_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
  orders: {
    getAllOrders: async (page:number,size:number): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_ALL_ORDERS_ENDPOINT,{
          params: { page, size }
        });
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getOrderDetails: async (orderId: string): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_ORDER_DETAILS_ENDPOINT(orderId));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    editOrderStatus: async (payload: any): Promise<AxiosResponse> => {
      console.log("edit order", payload)
      try {
        const { data, status } = await api.put(EDIT_ORDER_ENDPOINT,payload);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    deleteOrder: async (orderId: any): Promise<AxiosResponse> => {
      console.log("delete order", orderId)
      try {
        const { data, status } = await api.delete(DELETE_ORDER_ENDPOINT(orderId));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getSearchOrdersList: async (keyword: string): Promise<AxiosResponse> => {
      console.log("get search list")
      try {
        const { data, status } = await api.get(SEARCH_ORDERS_URL(keyword));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
  brands:{
    getBrandsList: async (): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_BRANDS_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    updateBrand: async (formData: FormData): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.put(ADD_OR_UPDATE_BRANDS_URL, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          }
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    createBrand: async (formData: FormData): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(ADD_OR_UPDATE_BRANDS_URL, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          }
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    deleteBrand: async (name: string): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.delete(DELETE_BRAND_URL(name));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    }
  },
  banners:{
    getBannersList: async (): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_BANNERS_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    addBanner: async (formData: FormData): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.post(ADD_OR_UPDATE_BANNERS_URL, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          }
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    deleteBanner: async (id: string): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.delete(DELETE_BANNER_URL(id));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    }
  }
};
