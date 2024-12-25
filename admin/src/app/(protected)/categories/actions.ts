'use server'

import { axios } from "@/lib/axios";
import { CATEGORIES_PAGE_ROUTE } from "@/utils/routes";
import { redirect } from "next/navigation";

// export async function getCategoryList() {
//     const { data, status, error } = await axios.categories.getCategoryList();

//     if (error) {
//         return { error: error.message };
//     }
//     return { data, status };
// }

export async function deleteCategory(categorySlug: string) {
    const { data, status, error } = await axios.categories.deleteCategory(categorySlug);

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
        redirect(CATEGORIES_PAGE_ROUTE);
    }
}