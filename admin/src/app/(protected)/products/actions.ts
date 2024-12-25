'use server'

import { axios } from "@/lib/axios";
import { PRODUCTS_PAGE_ROUTE } from "@/utils/routes";
import { redirect } from "next/navigation";

export async function deleteProduct(details: string) {
    const { data, status, error } = await axios.products.deleteProduct(details);

    if (error) {
      if (error.message?.includes('Unauthorised')) {
        throw new Error('UNAUTHORIZED', { 
          cause: {
            code: 'Unauthorised',
            message: 'Your session has expired. Please log in again.'
          }
        });
      } else {
        throw new Error('ERROR', { 
          cause: {
            code: 'UNKNOWN',
            message: error.message
          }
        });
      }
    }
    if (data && status === 200) {
        redirect(PRODUCTS_PAGE_ROUTE);
    }
} 