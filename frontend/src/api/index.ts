import {
  LOGIN_URL,
  PRODUCT_BY_ID_URL,
  PRODUCTS_URL,
  SIGNUP_URL,
  USER_BY_ID_URL,
  USERS_URL,
} from "@/utils/urls";
import api from "./axios";

const request = {
  authenticate: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post(LOGIN_URL, credentials);
      return response;
    } catch (error) {}
  },
  register: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post(SIGNUP_URL, credentials);
      return response;
    } catch (error) {}
  },
  getAllUsers: async () => {
    try {
      const { data } = await api.get(USERS_URL);
      return { data };
    } catch (error) {}
  },
  getUserByID: async (id: string) => {
    try {
      const { data } = await api.get(USER_BY_ID_URL(id));
      return { data };
    } catch (error) {}
  },
  getAllProducts: async () => {
    try {
      const { data } = await api.get(PRODUCTS_URL);
      return { data };
    } catch (error) {}
  },
  getProductByID: async (id: string) => {
    try {
      const { data } = await api.get(PRODUCT_BY_ID_URL(id));
      return { data };
    } catch (error) {}
  },
};

export default request;
