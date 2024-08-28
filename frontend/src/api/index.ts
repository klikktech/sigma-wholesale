import {
  PRODUCT_BY_ID_URL,
  PRODUCTS_URL,
  USER_BY_ID_URL,
  USERS_URL,
} from "@/utils/urls";
import axios from "axios";

const request = {
  getAllUsers: async () => {
    try {
      const { data } = await axios.get(USERS_URL);
      return { data };
    } catch (error) {}
  },
  getUserByID: async (id: string) => {
    try {
      const { data } = await axios.get(USER_BY_ID_URL(id));
      return { data };
    } catch (error) {}
  },
  getAllProducts: async () => {
    try {
      const { data } = await axios.get(PRODUCTS_URL);
      console.log(data);
      return { data };
    } catch (error) {}
  },
  getProductByID: async (id: string) => {
    try {
      const { data } = await axios.get(PRODUCT_BY_ID_URL(id));
      return { data };
    } catch (error) {}
  },
};

export default request;
