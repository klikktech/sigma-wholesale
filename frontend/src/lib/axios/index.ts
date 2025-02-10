import {
  PRODUCTS_URL,
  SIGNUP_URL,
  LOGIN_URL,
  LOGOUT_URL,
  CART_URL,
  CHECK_OUT_URL,
  NEW_ARRIVALS_URL,
  ORDERS_URL,
  USERS_DETAILS_URL,
  USER_UPDATE_URL,
  DELETE_ADDRESS_URL,
  ADDRESS_URL,
  PRODUCT_BY_CATEGORY_URL,
  SEARCH_PRODUCTS_URL,
  ORDER_PRODUCTS_URL,
  REFRESH_TOKEN_URL,
  DELETE_CART_ITEM_URL,
  PRODUCT_BY_BRAND_URL,
  GET_BRANDS_URL,
  GET_BANNERS_URL,
  FORGOT_PASSWORD_URL,
  CONFIRM_FORGOT_PASSWORD_URL,
} from "@/utils/urls";
import api, { authInstance } from "./instance";
import {
  AxiosErrorResponse,
  AxiosResponse,
  RegisterDetails,
  UserDetails,
} from "@/utils/types";

export const axios = {
  auth: {
    signInWithEmail: async (credentials: {
      email: string;
      password: string;
    }): Promise<AxiosResponse> => {
      console.log("post sign in");
      try {
        const { data, status } = await authInstance.post(
          LOGIN_URL,
          credentials
        );
        console.log(data, status, "inside index login");
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
    signUpWithEmail: async (
      userDetails: RegisterDetails
    ): Promise<AxiosResponse> => {
      try {
        const { data, status } = await authInstance.post(
          SIGNUP_URL,
          userDetails
        );
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
    forgotPassword: async (email: string): Promise<AxiosResponse> => {
      try {
        const payload = { email: email };
        const { data, status } = await authInstance.post(
          FORGOT_PASSWORD_URL,
          payload
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    confirmForgotPassword: async (payload: any): Promise<AxiosResponse> => {
      try {
        const { data, status } = await authInstance.post(
          CONFIRM_FORGOT_PASSWORD_URL,
          payload
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
  users: {
    getAddresses: async (type: string): Promise<AxiosResponse> => {
      console.log("get addresses", type);
      try {
        const { data, status } = await api.get(ADDRESS_URL(type));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    deleteAddress: async (address: string): Promise<AxiosResponse> => {
      console.log("delete address", address);
      try {
        const { data, status } = await api.delete(DELETE_ADDRESS_URL(address));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getUserDetails: async (): Promise<AxiosResponse> => {
      console.log("get user details");
      try {
        const { data, status } = await api.get(USERS_DETAILS_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    updateUserDetails: async (
      userDetails: UserDetails
    ): Promise<AxiosResponse> => {
      console.log("update user details", userDetails);
      try {
        const { data, status } = await api.put(USER_UPDATE_URL, userDetails);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
  products: {
    getNewArrivals: async (): Promise<AxiosResponse> => {
      console.log("get new arraivalss");
      try {
        const { data, status } = await api.get(`${NEW_ARRIVALS_URL}`);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getAllProducts: async (
      page: number,
      size: number
    ): Promise<AxiosResponse> => {
      console.log("get all prods products", page, size);
      try {
        const { data, status } = await api.get(PRODUCTS_URL, {
          params: { page, size },
        });
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getProductDetails: async (details: string): Promise<AxiosResponse> => {
      console.log("get prod details", details);

      try {
        const { data, status } = await api.get(`${PRODUCTS_URL}/${details}`);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getCategoryProducts: async (
      category: string,
      page: number,
      size: number
    ) => {
      try {
        const { data, status } = await api.get(
          PRODUCT_BY_CATEGORY_URL(category),
          {
            params: { page, size },
          }
        );
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getBrandProducts: async (brand: string, page: number, size: number) => {
      try {
        const { data, status } = await api.get(PRODUCT_BY_BRAND_URL(brand), {
          params: { page, size },
        });
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
      console.log("get cart list");
      try {
        const { data, status } = await api.get(CART_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    deleteCartItem: async (variation: any): Promise<AxiosResponse> => {
      console.log("delete address", variation);
      try {
        const { data, status } = await api.delete(
          DELETE_CART_ITEM_URL(variation)
        );
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
      console.log("get orders list");
      try {
        const { data, status } = await api.get(ORDERS_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getOrderItemsList: async (orderId: string): Promise<AxiosResponse> => {
      console.log("get orders list");
      try {
        const { data, status } = await api.get(ORDER_PRODUCTS_URL(orderId));
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getSearchProductsList: async (
      keyword: string,
      page: number,
      size: number
    ): Promise<AxiosResponse> => {
      console.log("get search list");
      try {
        const { data, status } = await api.get(SEARCH_PRODUCTS_URL(keyword), {
          params: { page, size },
        });
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
    getBrandsList: async (): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_BRANDS_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
  banners: {
    getBannersList: async (): Promise<AxiosResponse> => {
      try {
        const { data, status } = await api.get(GET_BANNERS_URL);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  },
};
