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

export async function deleteCategory(categoryName: string) {
    const { data, status, error } = await axios.categories.deleteCategory(categoryName);

    if (error) {
        if (error.message?.includes('Unauthorised')) {
            throw new Error('UNAUTHORIZED', { cause: error.message });
        }
        else{
            throw new Error(error.message)
        }
    }
    if (data && status === 200) {
        redirect(CATEGORIES_PAGE_ROUTE);
    }
}