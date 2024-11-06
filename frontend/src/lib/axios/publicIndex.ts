import { AxiosErrorResponse, AxiosResponse } from "@/utils/types";
import publicInstance from "./publicInstance";

export const publicAxios = {
  categories: {
    getProductsByCategory: async (category: string): Promise<AxiosResponse> => {
      console.log("get all prods in public", category)
      
      try {
        const { data, status } = await publicInstance.get(`/categories/${category}/products`);
        return { data, status };
      } catch (error) {
        return error as AxiosErrorResponse;
      }
    },
  }
};
